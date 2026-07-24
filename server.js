// Backend Server for Mail AI Assistant with GROQ
// Run with: node server.js
// Install: npm install express cors

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// ВСТАВЬ СЮДА СВОЙ GROQ API КЛЮЧ
// Получи на: https://console.groq.com/keys
// ============================================
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Проверка ключа
if (!GROQ_API_KEY) {
    console.log("\n⚠️  ВНИМАНИЕ: Переменная окружения GROQ_API_KEY не задана!\n");
}

// === CACHE ===
const cache = {
    classify: new Map(),
    summary: new Map()
};

// Очистка кэша каждые 30 минут
setInterval(() => {
    cache.classify.clear();
    cache.summary.clear();
    console.log('🗑️ Cache cleared');
}, 30 * 60 * 1000);

// Middleware
app.use(cors());
app.use(express.json());

// === ПРОМПТЫ ===
const classifyPrompts = {
    ru: `Классифицируй письмо. Ответь ТОЛЬКО ОДНИМ словом из этого списка:
Positive, Negative, Complaint, Suggestion, Spam

Правила:
- Positive = благодарность, похвала, положительный отзыв, радость
- Negative = критика, негативное мнение, разочарование, НО просто делится мнением без требования действий
- Complaint = ЖАЛОБА с конкретной проблемой + ТРЕБУЕТ решения/ответа/возврата/исправления. Клиент ожидает действий!
- Suggestion = идея, предложение, запрос новой функции
- Spam = рассылки, маркетинг, уведомления, notifications, newsletters, автоматические письма, noreply, промо

КЛЮЧЕВОЕ ОТЛИЧИЕ:
- Negative: "Мне не нравится ваш продукт, качество упало" (просто мнение)
- Complaint: "У меня сломался товар, требую возврат денег!" (проблема + требование)

Ответь ТОЛЬКО одним словом!

Письмо: {text}`,
    en: `Classify this email. Reply with ONLY ONE word from this list:
Positive, Negative, Complaint, Suggestion, Spam

Rules:
- Positive = thanks, praise, positive feedback, happiness
- Negative = criticism, negative opinion, disappointment, BUT just sharing opinion without demanding action
- Complaint = COMPLAINT with specific problem + DEMANDS resolution/response/refund/fix. Customer expects action!
- Suggestion = idea, proposal, feature request
- Spam = newsletters, marketing, notifications, automated emails, noreply, system alerts, promotions

KEY DIFFERENCE:
- Negative: "I don't like your product, quality has dropped" (just opinion)
- Complaint: "My item is broken, I demand a refund!" (problem + demand)

Reply with ONLY one word!

Email: {text}`,
    pl: `Sklasyfikuj email. Odpowiedz TYLKO JEDNYM słowem z tej listy:
Positive, Negative, Complaint, Suggestion, Spam

Zasady:
- Positive = podziękowanie, pochwała, pozytywna opinia, radość
- Negative = krytyka, negatywna opinia, rozczarowanie, ALE tylko dzieli się opinią bez żądania działań
- Complaint = SKARGA z konkretnym problemem + WYMAGA rozwiązania/odpowiedzi/zwrotu/naprawy. Klient oczekuje działań!
- Suggestion = pomysł, propozycja, prośba o nową funkcję
- Spam = newslettery, marketing, powiadomienia, automatyczne emaile, noreply, promocje

KLUCZOWA RÓŻNICA:
- Negative: "Nie podoba mi się wasz produkt, jakość spadła" (tylko opinia)
- Complaint: "Mój produkt jest zepsuty, żądam zwrotu!" (problem + żądanie)

Odpowiedz TYLKO jednym słowem!

Email: {text}`
};

const summaryPrompts = {
    ru: `Проанализируй письмо и ответь ТОЛЬКО валидным JSON (без markdown):
{"brief":"краткое описание 10-15 слов","sentiment":"positive/negative/neutral/urgent","keyPoints":["пункт1","пункт2"],"actionRequired":true или false}

Тема: {subject}
Текст: {snippet}`,

    en: `Analyze email and reply ONLY with valid JSON (no markdown):
{"brief":"short description 10-15 words","sentiment":"positive/negative/neutral/urgent","keyPoints":["point1","point2"],"actionRequired":true or false}

Subject: {subject}
Text: {snippet}`,

    pl: `Przeanalizuj email i odpowiedz TYLKO poprawnym JSON (bez markdown):
{"brief":"krótki opis 10-15 słów","sentiment":"positive/negative/neutral/urgent","keyPoints":["punkt1","punkt2"],"actionRequired":true lub false}

Temat: {subject}
Tekst: {snippet}`
};

// === GROQ API CALL ===
async function callGroq(prompt, maxTokens = 100) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.1
        })
    });

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    return data.choices?.[0]?.message?.content?.trim() || '';
}

// === API ROUTES ===

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Mail AI Assistant with Groq is running' });
});

// Classify email
app.post('/api/classify', async (req, res) => {
    try {
        const { text, language = 'en', emailId } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Проверяем кэш
        if (emailId && cache.classify.has(emailId)) {
            console.log('✅ Cache hit:', emailId);
            return res.json({ category: cache.classify.get(emailId) });
        }

        const shortText = text.substring(0, 300);
        const prompt = (classifyPrompts[language] || classifyPrompts['en']).replace('{text}', shortText);

        console.log('🔄 Classifying...');
        
        const result = await callGroq(prompt, 20);
        let category = result.split('\n')[0].trim();
        
        // Валидация: только разрешённые категории
        const validCategories = ['positive', 'negative', 'complaint', 'suggestion', 'spam'];
        const normalizedCategory = category.toLowerCase();
        
        // Notification и подобные → Spam
        if (normalizedCategory.includes('notification') || 
            normalizedCategory.includes('alert') || 
            normalizedCategory.includes('update')) {
            category = 'Spam';
        }
        // Если категория не из списка → Unknown
        else if (!validCategories.some(valid => normalizedCategory.includes(valid))) {
            console.log('⚠️ Invalid category:', category, '→ Unknown');
            category = 'Unknown';
        }
        // Нормализуем к правильному регистру
        else {
            const found = validCategories.find(valid => normalizedCategory.includes(valid));
            category = found.charAt(0).toUpperCase() + found.slice(1);
        }
        
        console.log('✅ Category:', category);

        // Кэшируем
        if (emailId) {
            cache.classify.set(emailId, category);
        }

        res.json({ category });
    } catch (error) {
        console.error('❌ Classify error:', error.message);
        res.json({ category: 'Unknown', error: error.message });
    }
});

// Generate summary
app.post('/api/summary', async (req, res) => {
    try {
        const { snippet, subject, language = 'en', emailId } = req.body;

        if (!snippet || !subject) {
            return res.status(400).json({ error: 'Snippet and subject required' });
        }

        // Проверяем кэш
        if (emailId && cache.summary.has(emailId)) {
            console.log('✅ Cache hit:', emailId);
            return res.json({ summary: cache.summary.get(emailId) });
        }

        const promptTemplate = summaryPrompts[language] || summaryPrompts['en'];
        const prompt = promptTemplate
            .replace('{subject}', subject.substring(0, 100))
            .replace('{snippet}', snippet.substring(0, 300));

        console.log('🔄 Generating summary...');
        
        let result = await callGroq(prompt, 200);
        
        // Чистим от markdown
        result = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let parsed;
        try {
            parsed = JSON.parse(result);
        } catch {
            parsed = {
                brief: result.substring(0, 100) || snippet.substring(0, 100),
                sentiment: 'neutral',
                keyPoints: [],
                actionRequired: false
            };
        }

        // Валидация
        if (!parsed.brief) parsed.brief = snippet.substring(0, 100);
        if (!parsed.sentiment) parsed.sentiment = 'neutral';
        if (!Array.isArray(parsed.keyPoints)) parsed.keyPoints = [];
        if (typeof parsed.actionRequired !== 'boolean') parsed.actionRequired = false;

        console.log('✅ Summary:', parsed.brief?.substring(0, 40) + '...');

        // Кэшируем
        if (emailId) {
            cache.summary.set(emailId, parsed);
        }

        res.json({ summary: parsed });
    } catch (error) {
        console.error('❌ Summary error:', error.message);
        res.json({
            summary: {
                brief: req.body.snippet?.substring(0, 100) || 'Error',
                sentiment: 'neutral',
                keyPoints: [],
                actionRequired: false
            },
            error: error.message
            
        });
    }
});

// Status
app.get('/api/status', (req, res) => {
    res.json({
        provider: 'Groq',
        model: 'llama-3.1-8b-instant',
        cache: {
            classify: cache.classify.size,
            summary: cache.summary.size
        }
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║         Mail AI Assistant with GROQ                       ║
║                                                           ║
║   Server: http://localhost:${PORT}                         ║
║   Model:  Llama 3.1 8B (very fast!)                       ║
║                                                           ║
║   Groq Free Limits:                                       ║
║   - 14,400 requests/day                                   ║
║   - 30 requests/minute                                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});
