// Frontend Configuration
const GOOGLE_CLIENT_ID = "967719524102-hoemnlkvuc47kldd4sa9pgjpi7r1eh3c.apps.googleusercontent.com";
// TODO: после деплоя backend на Render (или другой хостинг) замените этот URL на свой,
// например "https://mail-ai-backend.onrender.com/api"
const API_BASE_URL = "https://priolly.onrender.com/api"; // Backend URL
// Необязательно: если на backend задана переменная окружения APP_SECRET,
// впишите сюда то же самое значение — это простая защита от чужих запросов
// на ваш Groq-ключ (см. server.js). Оставьте пустым, если защита не нужна.
const APP_SECRET = "";
function apiHeaders() {
    return APP_SECRET
        ? { 'Content-Type': 'application/json', 'x-app-secret': APP_SECRET }
        : { 'Content-Type': 'application/json' };
}

let searchTimeout = null;

// Translations
const translations = {
    ru: {
        title: "Mail AI Assistant",
        subtitle: "Автоматическая классификация писем Gmail с помощью ИИ",
        loginButton: "Войти через Google",
        mailInsights: "Mail AI Assistant",
        allCategories: "Все категории",
        complaint: "Жалоба",
        positive: "Положительное",
        negative: "Отрицательное",
        suggestion: "Предложение",
        spam: "Спам",
        classified: "Классифицировано",
        loading: "Загрузка...",
        refreshEmails: "Обновить письма",
        emails: "Письма",
        noEmails: "Нет писем для отображения",
        clickRefresh: "Нажмите \"Обновить письма\" для загрузки",
        sender: "Отправитель",
        subject: "Тема",
        category: "Категория",
        date: "Дата",
        action: "Действие",
        open: "Открыть",
        unknown: "Неизвестно",
        crmTitle: "CRM - База контактов",
        contactName: "Имя",
        contactEmail: "Email",
        lastContact: "Последний контакт",
        summary: "Краткое содержание",
        viewDetails: "Показать детали",
        hideDetails: "Скрыть детали",
        noCrmData: "Нет данных CRM",
        crmDescription: "Контакты будут добавляться автоматически при классификации писем",
        interactions: "писем",
        sentiment: "Настроение",
        keyPoints: "Ключевые моменты",
        actionRequired: "Требуется действие",
        sortByDate: "По дате",
        sortByPriority: "По приоритету",
        priority: "Приоритет",
        critical: "Критичный",
        high: "Высокий",
        normal: "Обычный",
        low: "Низкий",
        autoResponder: "Автоответчик",
        autoResponderDesc: "Автоматический ответ на входящие письма",
        autoResponderActive: "Автоответчик активен",
        autoResponderConfirmTitle: "Включить автоответчик?",
        autoResponderConfirmText: "Вы уверены, что хотите включить автоматические ответы на все входящие письма (кроме спама)?",
        autoResponderYes: "Да, включить",
        autoResponderCancel: "Отмена",
        autoResponderSettings: "Настройка автоответчика",
        autoResponderTextLabel: "Текст автоматического ответа:",
        autoResponderPlaceholder: "Введите текст автоматического ответа...",
        autoResponderInfo: "Как это работает:",
        autoResponderInfo1: "Автоответ отправляется на каждое новое письмо",
        autoResponderInfo2: "Письма, помеченные как \"Спам\", игнорируются",
        autoResponderInfo3: "Ответ отправляется автоматически сразу после получения письма",
        autoResponderSave: "Сохранить и включить",
        markAsReplied: "Отметить как отвечено",
        replied: "Отвечено",
        emailsAwaitingReply: "писем ждут ответа",
        emailAwaitingReply: "письмо ждёт ответа",
        undoReplied: "Отменить",
        hideReplied: "Скрыть отвеченные",
        showReplied: "Показать отвеченные",
        showMore: "Показать ещё",
        classifying: "Классификация..."
    },
    en: {
        title: "Mail AI Assistant",
        subtitle: "Automatic Gmail classification with AI",
        loginButton: "Login with Google",
        mailInsights: "Mail AI Assistant",
        allCategories: "All categories",
        complaint: "Complaint",
        positive: "Positive",
        negative: "Negative",
        suggestion: "Suggestion",
        spam: "Spam",
        classified: "Classified",
        loading: "Loading...",
        refreshEmails: "Refresh emails",
        emails: "Emails",
        noEmails: "No emails to display",
        clickRefresh: "Click \"Refresh emails\" to load",
        sender: "Sender",
        subject: "Subject",
        category: "Category",
        date: "Date",
        action: "Action",
        open: "Open",
        unknown: "Unknown",
        crmTitle: "CRM - Contact Database",
        contactName: "Name",
        contactEmail: "Email",
        lastContact: "Last Contact",
        summary: "Summary",
        viewDetails: "Show details",
        hideDetails: "Hide details",
        noCrmData: "No CRM data",
        crmDescription: "Contacts will be added automatically when classifying emails",
        interactions: "emails",
        sentiment: "Sentiment",
        keyPoints: "Key Points",
        actionRequired: "Action Required",
        replySent: "Reply sent",
        replyError: "Send error",
        sortByDate: "By date",
        sortByPriority: "By priority",
        priority: "Priority",
        critical: "Critical",
        high: "High",
        normal: "Normal",
        low: "Low",
        autoResponder: "Auto-responder",
        autoResponderDesc: "Automatic reply to incoming emails",
        autoResponderActive: "Auto-responder is active",
        autoResponderConfirmTitle: "Enable auto-responder?",
        autoResponderConfirmText: "Are you sure you want to enable automatic replies to all incoming emails (except spam)?",
        autoResponderYes: "Yes, enable",
        autoResponderCancel: "Cancel",
        autoResponderSettings: "Auto-responder settings",
        autoResponderTextLabel: "Automatic reply text:",
        autoResponderPlaceholder: "Enter automatic reply text...",
        autoResponderInfo: "How it works:",
        autoResponderInfo1: "Auto-reply is sent for every new email",
        autoResponderInfo2: "Emails marked as \"Spam\" are ignored",
        autoResponderInfo3: "Reply is sent automatically immediately after receiving email",
        autoResponderSave: "Save and enable",
        markAsReplied: "Mark as replied",
        replied: "Replied",
        emailsAwaitingReply: "emails awaiting reply",
        emailAwaitingReply: "email awaiting reply",
        undoReplied: "Undo",
        hideReplied: "Hide replied",
        showReplied: "Show replied",
        showMore: "Show more",
        classifying: "Classifying..."
    },
    pl: {
        title: "Mail AI Assistant",
        subtitle: "Automatyczna klasyfikacja emaili Gmail z AI",
        loginButton: "Zaloguj przez Google",
        mailInsights: "Mail AI Assistant",
        allCategories: "Wszystkie kategorie",
        complaint: "Skarga",
        positive: "Pozytywne",
        negative: "Negatywne",
        suggestion: "Sugestia",
        spam: "Spam",
        classified: "Sklasyfikowano",
        loading: "Ładowanie...",
        refreshEmails: "Odśwież emaile",
        emails: "Emaile",
        noEmails: "Brak emaili do wyświetlenia",
        clickRefresh: "Kliknij \"Odśwież emaile\" aby załadować",
        sender: "Nadawca",
        subject: "Temat",
        category: "Kategoria",
        date: "Data",
        action: "Akcja",
        open: "Otwórz",
        unknown: "Nieznane",
        crmTitle: "CRM - Baza kontaktów",
        contactName: "Imię",
        contactEmail: "Email",
        lastContact: "Ostatni kontakt",
        summary: "Podsumowanie",
        viewDetails: "Pokaż szczegóły",
        hideDetails: "Ukryj szczegóły",
        noCrmData: "Brak danych CRM",
        crmDescription: "Kontakty będą dodawane automatycznie podczas klasyfikacji emaili",
        interactions: "emaili",
        sentiment: "Nastrój",
        keyPoints: "Kluczowe punkty",
        actionRequired: "Wymagane działanie",
        replySent: "Odpowiedź wysłana",
        replyError: "Błąd wysyłania",
        sortByDate: "Według daty",
        sortByPriority: "Według priorytetu",
        priority: "Priorytet",
        critical: "Krytyczny",
        high: "Wysoki",
        normal: "Normalny",
        low: "Niski",
        autoResponder: "Autoodpowiedź",
        autoResponderDesc: "Automatyczna odpowiedź na przychodzące emaile",
        autoResponderActive: "Autoodpowiedź jest aktywna",
        autoResponderConfirmTitle: "Włączyć autoodpowiedź?",
        autoResponderConfirmText: "Czy na pewno chcesz włączyć automatyczne odpowiedzi na wszystkie przychodzące emaile (z wyjątkiem spamu)?",
        autoResponderYes: "Tak, włącz",
        autoResponderCancel: "Anuluj",
        autoResponderSettings: "Ustawienia autoodpowiedzi",
        autoResponderTextLabel: "Tekst automatycznej odpowiedzi:",
        autoResponderPlaceholder: "Wprowadź tekst automatycznej odpowiedzi...",
        autoResponderInfo: "Jak to działa:",
        autoResponderInfo1: "Autoodpowiedź jest wysyłana na każdy nowy email",
        autoResponderInfo2: "Emaile oznaczone jako \"Spam\" są ignorowane",
        autoResponderInfo3: "Odpowiedź jest wysyłana automatycznie zaraz po otrzymaniu emaila",
        autoResponderSave: "Zapisz i włącz",
        markAsReplied: "Oznacz jako odpowiedziane",
        replied: "Odpowiedziano",
        emailsAwaitingReply: "emaili czeka na odpowiedź",
        emailAwaitingReply: "email czeka na odpowiedź",
        undoReplied: "Cofnij",
        hideReplied: "Ukryj odpowiedziane",
        showReplied: "Pokaż odpowiedziane",
        showMore: "Pokaż więcej",
        classifying: "Klasyfikacja..."
    }
};

// Application State
let state = {
    user: null,
    accessToken: null,
    emails: [],
    allMessageIds: [], // Все ID писем из Gmail
    loading: false,
    classifyingMore: false,
    filter: 'all',
    classifiedEmails: {},
    language: 'en',
    crmContacts: {},
    currentView: 'emails',
    expandedContacts: {},
    sortMode: 'date',
    emailPriorities: {},
    autoResponderEnabled: false,
    autoResponderText: 'Спасибо за ваше сообщение. Я получил ваше письмо и отвечу в ближайшее время.',
    showAutoResponderModal: false,
    showConfirmDialog: false,
    repliedEmails: {},
    hideReplied: false,
    searchQuery: '',
    searchType: 'all', // 'all', 'subject', 'sender'
    visibleEmailsCount: 15,
    emailsPerPage: 15
};

// Helper Functions
function t(key) {
    return translations[state.language][key] || key;
}

function handleSearch(query) {
    state.searchQuery = query.toLowerCase().trim();
    state.searchType = 'all'; // Всегда ищем везде
    state.visibleEmailsCount = state.emailsPerPage; // Сброс на первые 15
    
    // Отменяем предыдущий таймер
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Обновляем только таблицу с небольшой задержкой
    searchTimeout = setTimeout(() => {
        updateEmailTable();
    }, 300); // 300ms задержка
}

// Функция фильтрации по поиску
function filterEmailsBySearch(emails) {
    if (!state.searchQuery) {
        return emails;
    }

    return emails.filter(email => {
        const subject = (email.subject || '').toLowerCase();
        const sender = (email.from || '').toLowerCase();
        const snippet = (email.snippet || '').toLowerCase(); // ДОБАВЛЕНО
        
        // Ищем везде: тема + отправитель + содержание
        return subject.includes(state.searchQuery) || 
               sender.includes(state.searchQuery) ||
               snippet.includes(state.searchQuery); // ДОБАВЛЕНО
    });
}

function updateEmailTable() {
    const emailsWithCategories = state.emails.map(email => ({
        ...email,
        category: state.classifiedEmails[email.id] || email.category || 'Unknown'
    }));
    
    // Применяем фильтры
    let filteredEmails = state.filter === 'all' 
        ? emailsWithCategories 
        : emailsWithCategories.filter(e => matchesCategory(e.category, state.filter));

    // Применяем поиск
    filteredEmails = filterEmailsBySearch(filteredEmails);

    // Сортировка
    if (state.sortMode === 'priority') {
        filteredEmails = sortEmailsByPriority(filteredEmails);
    } else {
        filteredEmails = [...filteredEmails].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Скрываем отвеченные
    if (state.hideReplied) {
        filteredEmails = filteredEmails.filter(email => !state.repliedEmails[email.id]);
    }

    // Обновляем только таблицу и счетчик результатов
    const tableContainer = document.querySelector('.bg-white.rounded-xl.shadow-sm.overflow-hidden');
    const searchResults = document.getElementById('searchResults');
    
    if (tableContainer) {
        tableContainer.innerHTML = renderEmailTable(filteredEmails);
    }
    
    if (searchResults) {
        searchResults.innerHTML = renderSearchResults(filteredEmails);
    }
}
// Функция рендера только таблицы
function renderEmailTable(filteredEmails) {
    if (filteredEmails.length === 0) {
        return `
            <div class="text-center py-16 text-gray-500">
                ${state.searchQuery ? `
                    <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                        <svg class="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <p class="text-lg font-semibold text-gray-800 mb-1">
                        ${state.language === 'ru' ? 'Ничего не найдено' : state.language === 'pl' ? 'Nic nie znaleziono' : 'No results found'}
                    </p>
                    <p class="text-sm text-gray-500">
                        ${state.language === 'ru' ? 'Попробуйте изменить запрос или очистить поиск' : 
                          state.language === 'pl' ? 'Spróbuj zmienić zapytanie lub wyczyścić wyszukiwanie' : 
                          'Try changing your query or clearing the search'}
                    </p>
                ` : `
                    <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                        <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <p class="text-lg font-semibold text-gray-800 mb-1">${t('noEmails')}</p>
                    <p class="text-sm text-gray-500">${t('clickRefresh')}</p>
                `}
            </div>
        `;
    }
    
    return `
        <div class="overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-gray-100">
                            <th class="px-6 py-3 text-left">
                                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Name</span>
                            </th>
                            <th class="px-6 py-3 text-left">
                                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Email</span>
                            </th>
                            <th class="px-6 py-3 text-left">
                                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Tags</span>
                            </th>
                            <th class="px-6 py-3 text-right">
                                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        ${filteredEmails.map((email, index) => {
                            const priority = calculateEmailPriority(email);
                            const isReplied = state.repliedEmails[email.id];
                            const category = (email.category || '').toLowerCase();
                            const isSpam = category.includes('spam') || category.includes('спам');
                            
                            // Подсветка поискового запроса
                            let highlightedSubject = email.subject;
                            let highlightedSender = email.from.split('<')[0].trim();
                            let senderEmail = email.from.match(/<(.+?)>/)?.[1] || email.from;
                            
                            if (state.searchQuery) {
                                const regex = new RegExp(`(${state.searchQuery})`, 'gi');
                                highlightedSubject = highlightedSubject.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
                                highlightedSender = highlightedSender.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
                            }
                            
                            // Генерация аватара
                            const senderInitial = highlightedSender.charAt(0).toUpperCase();
                            const avatarColors = [
                                'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
                                'bg-orange-500', 'bg-pink-500', 'bg-indigo-500',
                                'bg-red-500', 'bg-teal-500', 'bg-cyan-500'
                            ];
                            const avatarColor = avatarColors[index % avatarColors.length];
                            
                            // Форматирование даты
                            const dateObj = new Date(email.date);
                            const now = new Date();
                            const diffTime = Math.abs(now - dateObj);
                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                            const diffMinutes = Math.floor(diffTime / (1000 * 60));
                            
                            let timeDisplay;
                            if (diffMinutes < 60) {
                                timeDisplay = `${diffMinutes} min`;
                            } else if (diffHours < 24) {
                                timeDisplay = `${diffHours}h`;
                            } else if (diffDays < 7) {
                                timeDisplay = `${diffDays}d`;
                            } else if (diffDays < 30) {
                                timeDisplay = `${Math.floor(diffDays / 7)}w`;
                            } else {
                                const months = Math.floor(diffDays / 30);
                                timeDisplay = `${months}mo`;
                            }
                            
                            return `
                            <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-all duration-150 cursor-pointer group" 
                                onclick="window.open('${email.link}', '_blank')"
                                style="${isReplied ? 'opacity: 0.5;' : ''}">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="relative">
                                            <div class="w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center flex-shrink-0 font-semibold text-white text-sm shadow-sm">
                                                ${senderInitial}
                                            </div>
                                            ${!isReplied && priority.level === 'critical' ? `
                                                <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                            ` : ''}
                                            ${isReplied ? `
                                                <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                            ` : ''}
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <div class="text-[13px] font-semibold text-gray-900 truncate">
                                                ${highlightedSender}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="min-w-0">
                                        <div class="text-[13px] text-gray-600 truncate max-w-md group-hover:text-gray-900 transition-colors">
                                            ${highlightedSubject}
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${getCategoryColor(email.category)} whitespace-nowrap">
                                            ${translateCategory(email.category)}
                                        </span>
                                        ${priority.level === 'critical' || priority.level === 'high' ? `
                                            <div class="w-1.5 h-1.5 rounded-full" style="background-color: ${priority.color}"></div>
                                        ` : ''}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-3">
                                        <span class="text-[13px] text-gray-500 font-medium whitespace-nowrap">${timeDisplay}</span>
                                        ${!isSpam ? `
                                            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                                                ${isReplied ? `
                                                    <button onclick="event.stopPropagation(); undoEmailReplied('${email.id}')" 
                                                            class="text-[11px] text-amber-600 hover:text-amber-700 font-semibold px-2 py-1 rounded hover:bg-amber-50 transition-all">
                                                        Undo
                                                    </button>
                                                ` : `
                                                    <button onclick="event.stopPropagation(); markEmailAsReplied('${email.id}')" 
                                                            class="text-[11px] text-green-600 hover:text-green-700 font-semibold px-2 py-1 rounded hover:bg-green-50 transition-all">
                                                        ✓ Mark
                                                    </button>
                                                `}
                                            </div>
                                        ` : ''}
                                    </div>
                                </td>
                            </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
function renderSearchResults(filteredEmails) {
    if (!state.searchQuery) return '';
    
    return `
        <div class="flex items-center gap-2 text-sm">
            <span class="text-purple-700 font-medium">
                ${state.language === 'ru' ? 'Найдено:' : state.language === 'pl' ? 'Znaleziono:' : 'Found:'} ${filteredEmails.length} 
                ${state.language === 'ru' ? 'писем' : state.language === 'pl' ? 'emaili' : 'emails'}
            </span>
            <span class="text-purple-600">
                ${state.searchType === 'subject' ? '📧 ' + (state.language === 'ru' ? 'по теме' : state.language === 'pl' ? 'w temacie' : 'in subject') : 
                  state.searchType === 'sender' ? '👤 ' + (state.language === 'ru' ? 'по отправителю' : state.language === 'pl' ? 'w nadawcy' : 'in sender') : 
                  '🔍 ' + (state.language === 'ru' ? 'везде' : state.language === 'pl' ? 'wszędzie' : 'everywhere')}
            </span>
            <span class="px-2 py-1 bg-purple-200 text-purple-800 rounded font-mono text-xs">
                "${state.searchQuery}"
            </span>
        </div>
    `;
}

// Функция фильтрации по поиску
function filterEmailsBySearch(emails) {
    if (!state.searchQuery) {
        return emails;
    }

    return emails.filter(email => {
        const subject = (email.subject || '').toLowerCase();
        const sender = (email.from || '').toLowerCase();
        
        switch(state.searchType) {
            case 'subject':
                return subject.includes(state.searchQuery);
            case 'sender':
                return sender.includes(state.searchQuery);
            case 'all':
            default:
                return subject.includes(state.searchQuery) || 
                       sender.includes(state.searchQuery);
        }
    });
}

// Функция очистки поиска
function clearSearch() {
    state.searchQuery = '';
    state.searchType = 'all';
    updateEmailTable();
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('classifiedEmails');
    if (saved) state.classifiedEmails = JSON.parse(saved);
    
    const crmSaved = localStorage.getItem('crmContacts');
    if (crmSaved) state.crmContacts = JSON.parse(crmSaved);
    
    const langSaved = localStorage.getItem('language');
    if (langSaved) state.language = langSaved;

    const sortSaved = localStorage.getItem('sortMode');
    if (sortSaved) state.sortMode = sortSaved;
    
    const emailsSaved = localStorage.getItem('emails');
    if (emailsSaved) {
        const allEmails = JSON.parse(emailsSaved);
        // Показываем только первые 15 при загрузке
        state.emails = allEmails.slice(0, state.emailsPerPage);
        // Сохраняем все ID для "показать ещё"
        state.allMessageIds = allEmails.map(e => e.id);
    }
    
    const autoResponderEnabled = localStorage.getItem('autoResponderEnabled');
    if (autoResponderEnabled) state.autoResponderEnabled = autoResponderEnabled === 'true';
    
    const autoResponderText = localStorage.getItem('autoResponderText');
    if (autoResponderText) state.autoResponderText = autoResponderText;

    const repliedEmails = localStorage.getItem('repliedEmails');
    if (repliedEmails) state.repliedEmails = JSON.parse(repliedEmails);

    const hideReplied = localStorage.getItem('hideReplied');
    if (hideReplied) state.hideReplied = hideReplied === 'true';
}

function saveToLocalStorage() {
    localStorage.setItem('classifiedEmails', JSON.stringify(state.classifiedEmails));
    localStorage.setItem('crmContacts', JSON.stringify(state.crmContacts));
    localStorage.setItem('emails', JSON.stringify(state.emails));
    localStorage.setItem('repliedEmails', JSON.stringify(state.repliedEmails));
}

function changeLanguage(lang) {
    state.language = lang;
    localStorage.setItem('language', lang);
    render();
}

function changeView(view) {
    state.currentView = view;
    render();
}

function toggleContact(email) {
    state.expandedContacts[email] = !state.expandedContacts[email];
    render();
}

window.toggleSortMode = function() {
    state.sortMode = state.sortMode === 'date' ? 'priority' : 'date';
    state.visibleEmailsCount = state.emailsPerPage; // Сброс на первые 15
    localStorage.setItem('sortMode', state.sortMode);
    render();
}

function matchesCategory(category, filter) {
    const cat = category.toLowerCase();
    
    switch(filter.toLowerCase()) {
        case 'complaint':
            return cat.includes('complaint');
        case 'positive':
            return cat.includes('positive');
        case 'negative':
            return cat.includes('negative');
        case 'suggestion':
            return cat.includes('suggestion');
        case 'spam':
            return cat.includes('spam');
        default:
            return true;
    }
}

// Google Login
function handleLogin() {
    const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: async (response) => {
            if (response.access_token) {
                state.accessToken = response.access_token;
                await fetchUserInfo();
                render();
            }
        }
    });
    client.requestAccessToken();
}

async function fetchUserInfo() {
    try {
        const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${state.accessToken}` }
        });
        
        const userData = await res.json();
        
        state.user = {
            name: userData.name || 'User',
            email: userData.email || '',
            picture: userData.picture || 'https://via.placeholder.com/40'
        };
        
        loadFromLocalStorage();
    } catch (err) {
        console.error('Error fetching user info:', err);
        state.user = {
            name: 'User',
            email: '',
            picture: 'https://via.placeholder.com/40'
        };
    }
}

function handleLogout() {
    state.user = null;
    state.accessToken = null;
    state.emails = [];
    localStorage.removeItem('emails');
    render();
}

// Email Functions
async function fetchEmails() {
    if (!state.accessToken || state.loading) return;
    state.loading = true;
    state.visibleEmailsCount = state.emailsPerPage; // Сброс при обновлении
    render();

    try {
        // Получаем только ID писем (это быстро и не тратит лимиты)
        const res = await fetch(
            'https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=100&q=in:inbox -from:me',
            { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
        const data = await res.json();

        if (data.messages) {
            // Сохраняем все ID
            state.allMessageIds = data.messages.map(msg => msg.id);
            
            // Загружаем детали только для первых 15
            const firstBatchIds = state.allMessageIds.slice(0, state.emailsPerPage);
            const emailDetails = [];
            
            for (const id of firstBatchIds) {
                const detail = await fetchEmailDetail(id);
                if (detail && detail.from !== 'Error') {
                    emailDetails.push(detail);
                }
            }
            
            // Фильтруем свои письма
            state.emails = emailDetails.filter(email => {
                const emailAddress = email.from.match(/<(.+?)>/)?.[1] || email.from;
                return emailAddress.toLowerCase() !== state.user.email.toLowerCase();
            });
            
            // Классифицируем загруженные письма
            await classifyVisibleEmails();
            
            saveToLocalStorage();
            render();
        }
    } catch (err) {
        console.error('Error fetching emails:', err);
        alert('Error loading emails');
    } finally {
        state.loading = false;
        render();
    }
}

// Классификация видимых писем (ВСЕ загруженные письма)
async function classifyVisibleEmails() {
    for (const email of state.emails) {
        const cachedCategory = state.classifiedEmails[email.id];
        
        // Пропускаем если уже есть нормальная категория (не Unknown)
        const isUnknown = !cachedCategory || 
            cachedCategory.toLowerCase() === 'unknown' || 
            cachedCategory.toLowerCase() === 'неизвестно' ||
            cachedCategory.toLowerCase() === 'nieznane';
        
        if (isUnknown) {
            console.log('🔄 Classifying:', email.subject?.substring(0, 30));
            const category = await classifyEmail(email.snippet, email.id);
            state.classifiedEmails[email.id] = category;
            // Обновляем UI после каждой классификации
            saveToLocalStorage();
            render();
        } else {
            console.log('✅ Already classified:', cachedCategory);
        }
    }
    
    // Автоответчик для классифицированных писем
    if (state.autoResponderEnabled) {
        state.emails.forEach(email => {
            const category = state.classifiedEmails[email.id]?.toLowerCase() || '';
            if (!category.includes('spam') && !category.includes('спам')) {
                sendAutoReply(email);
            }
        });
    }
    
    saveToLocalStorage();
}

// Показать больше писем
async function showMoreEmails() {
    if (state.classifyingMore) return;
    
    state.classifyingMore = true;
    render(); // Показываем индикатор загрузки
    
    try {
        // Определяем какие ID ещё не загружены
        const loadedIds = new Set(state.emails.map(e => e.id));
        const notLoadedIds = state.allMessageIds.filter(id => !loadedIds.has(id));
        
        // Берём следующие 15 ID
        const nextBatchIds = notLoadedIds.slice(0, state.emailsPerPage);
        
        if (nextBatchIds.length === 0) {
            state.classifyingMore = false;
            render();
            return;
        }
        
        // 1. Загружаем детали писем
        console.log('📥 Loading emails...');
        const newEmailDetails = [];
        for (const id of nextBatchIds) {
            const detail = await fetchEmailDetail(id);
            if (detail && detail.from !== 'Error') {
                newEmailDetails.push(detail);
            }
        }
        
        // Фильтруем свои письма
        const filteredNew = newEmailDetails.filter(email => {
            const emailAddress = email.from.match(/<(.+?)>/)?.[1] || email.from;
            return emailAddress.toLowerCase() !== state.user.email.toLowerCase();
        });
        
        // 2. Классифицируем ВСЕ письма ПЕРЕД показом
        console.log('🤖 Classifying', filteredNew.length, 'emails...');
        for (const email of filteredNew) {
            const cachedCategory = state.classifiedEmails[email.id];
            
            // Пропускаем если уже есть нормальная категория
            const isUnknown = !cachedCategory || 
                cachedCategory.toLowerCase() === 'unknown' || 
                cachedCategory.toLowerCase() === 'неизвестно' ||
                cachedCategory.toLowerCase() === 'nieznane';
            
            if (isUnknown) {
                console.log('🔄 Classifying:', email.subject?.substring(0, 30));
                const category = await classifyEmail(email.snippet, email.id);
                state.classifiedEmails[email.id] = category;
            } else {
                console.log('✅ Cache hit:', cachedCategory);
            }
        }
        
        // 3. Только ПОСЛЕ классификации добавляем к списку и показываем
        state.emails = [...state.emails, ...filteredNew];
        state.visibleEmailsCount = state.emails.length;
        
        saveToLocalStorage();
        console.log('✅ Done! Showing', filteredNew.length, 'new emails');
        
    } catch (err) {
        console.error('Error loading more emails:', err);
    } finally {
        state.classifyingMore = false;
        render(); // Финальный render с готовыми данными
    }
}

async function fetchEmailDetail(id) {
    try {
        const res = await fetch(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`,
            { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
        const data = await res.json();

        const headers = data.payload.headers;
        const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const date = headers.find(h => h.name === 'Date')?.value || '';
        const threadId = data.threadId;
        
        return {
            id: data.id,
            threadId: threadId,
            from,
            subject,
            snippet: data.snippet || '',
            date,
            link: `https://mail.google.com/mail/u/0/#inbox/${threadId}`
        };
    } catch (err) {
        console.error('Error fetching email detail:', err);
        return { id, threadId: '', from: 'Error', subject: 'Error', snippet: '', date: '', link: '' };
    }
}

// === RATE LIMIT на клиенте ===
let clientRateLimitedUntil = 0;

function isClientRateLimited() {
    return Date.now() < clientRateLimitedUntil;
}

// Backend API Calls
async function classifyEmail(text, emailId = null) {
    try {
        const response = await fetch(`${API_BASE_URL}/classify`, {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify({ text, language: state.language, emailId })
        });
        
        if (!response.ok) {
            console.error('Classification API error:', response.status);
            return t('unknown');
        }
        
        const data = await response.json();
        console.log('✅ Classified as:', data.category);
        return data.category || t('unknown');
    } catch (err) {
        console.error('Error classifying email:', err.message);
        return t('unknown');
    }
}


// Priority Calculation
function calculateEmailPriority(email) {
    if (state.emailPriorities[email.id]) {
        return state.emailPriorities[email.id];
    }

    const category = state.classifiedEmails[email.id]?.toLowerCase() || '';
    const subject = (email.subject || '').toLowerCase();
    const snippet = (email.snippet || '').toLowerCase();
    const text = subject + ' ' + snippet;
    
    const emailAddress = email.from.match(/<(.+?)>/)?.[1] || email.from;
    const crmContact = state.crmContacts[emailAddress];
    let sentiment = 'neutral';
    
    if (crmContact && crmContact.interactions && crmContact.interactions.length > 0) {
        const lastInteraction = crmContact.interactions[0];
        if (lastInteraction.summaryData && lastInteraction.summaryData.sentiment) {
            sentiment = lastInteraction.summaryData.sentiment;
        }
    }
    
    const urgentKeywords = ['urgent', 'срочно', 'pilnie', 'asap', 'immediately', 'критично', 'deadline', 'today', 'now'];
    const severeKeywords = ['fire', 'dangerous', 'safety', 'lawsuit', 'пожар', 'опасно'];
    const negativeKeywords = ['disappointed', 'unhappy', 'upset', 'angry', 'terrible', 'недоволен'];
    const problemKeywords = ['problem', 'issue', 'incorrect', 'проблема', 'вернуть'];
    const spamKeywords = ['unsubscribe', 'newsletter', 'promo', 'sale', 'discount', 'free', 'win'];

    let priorityScore = 50;

    if (category.includes('жалоб') || category.includes('complaint') || category.includes('skarg')) {
        priorityScore = 70;
    } else if (category.includes('отрицательн') || category.includes('negative') || category.includes('negatywn')) {
        priorityScore = 65;
    } else if (category.includes('предложени') || category.includes('suggestion') || category.includes('sugest')) {
        priorityScore = 45;
    } else if (category.includes('положительн') || category.includes('positive') || category.includes('pozytywn')) {
        priorityScore = 30;
    } else if (category.includes('спам') || category.includes('spam')) {
        priorityScore = 10;
    }

    if (sentiment === 'urgent') {
        priorityScore = Math.min(100, priorityScore + 15);
    } else if (sentiment === 'negative') {
        priorityScore = Math.min(100, priorityScore + 8);
    }

    urgentKeywords.forEach(kw => {
        if (text.includes(kw)) priorityScore = Math.min(100, priorityScore + 5);
    });

    severeKeywords.forEach(kw => {
        if (text.includes(kw)) priorityScore = Math.min(100, priorityScore + 15);
    });

    spamKeywords.forEach(kw => {
        if (text.includes(kw)) priorityScore = Math.max(5, priorityScore - 10);
    });

    let level;
    if (priorityScore >= 80) level = 'critical';
    else if (priorityScore >= 60) level = 'high';
    else if (priorityScore >= 30) level = 'normal';
    else level = 'low';

    const priority = {
        score: priorityScore,
        level: level,
        color: getPriorityColor(level),
        sentiment: sentiment
    };

    state.emailPriorities[email.id] = priority;
    return priority;
}

function getPriorityColor(level) {
    switch(level) {
        case 'critical': return '#ef4444';
        case 'high': return '#f59e0b';
        case 'normal': return '#10b981';
        case 'low': return '#6b7280';
        default: return '#6b7280';
    }
}

function getPriorityBgColor(level) {
    switch(level) {
        case 'critical': return 'bg-red-100 border-l-4 border-red-500';
        case 'high': return 'bg-amber-50 border-l-4 border-amber-400';
        case 'normal': return 'bg-emerald-50 border-l-4 border-emerald-400';
        case 'low': return 'bg-gray-50 border-l-4 border-gray-300';
        default: return 'bg-white';
    }
}

function sortEmailsByPriority(emails) {
    return [...emails].sort((a, b) => {
        const priorityA = calculateEmailPriority(a);
        const priorityB = calculateEmailPriority(b);
        
        if (priorityB.score !== priorityA.score) {
            return priorityB.score - priorityA.score;
        }
        
        return new Date(b.date) - new Date(a.date);
    });
}

// UI Helper Functions
function translateCategory(category) {
    const cat = category.toLowerCase();
    
    if (cat.includes('complaint')) {
        return t('complaint');
    }
    if (cat.includes('positive')) {
        return t('positive');
    }
    if (cat.includes('negative')) {
        return t('negative');
    }
    if (cat.includes('suggestion')) {
        return t('suggestion');
    }
    if (cat.includes('spam')) {
        return t('spam');
    }
    return t('unknown');
}

function getCategoryColor(category) {
    const cat = category.toLowerCase();
    // Мягкие pill-стили
    if (cat.includes('complaint')) {
        return 'bg-amber-100 text-amber-700';
    }
    if (cat.includes('positive')) {
        return 'bg-emerald-100 text-emerald-700';
    }
    if (cat.includes('negative')) {
        return 'bg-rose-100 text-rose-700';
    }
    if (cat.includes('suggestion')) {
        return 'bg-sky-100 text-sky-700';
    }
    if (cat.includes('spam')) {
        return 'bg-gray-300 text-gray-700';
    }
    // Unknown - серый
    return 'bg-gray-100 text-gray-500';
}

function formatDate(dateStr) {
    try {
        const locale = state.language === 'ru' ? 'ru-RU' : state.language === 'pl' ? 'pl-PL' : 'en-US';
        return new Date(dateStr).toLocaleDateString(locale);
    } catch {
        return dateStr;
    }
}

function getSentimentIcon(sentiment) {
    const sent = sentiment?.toLowerCase() || 'neutral';
    if (sent.includes('positive') || sent.includes('положительн') || sent.includes('pozytywn')) return '😊';
    if (sent.includes('negative') || sent.includes('отрицательн') || sent.includes('negatywn')) return '😞';
    if (sent.includes('urgent') || sent.includes('срочн') || sent.includes('pilne')) return '⚠️';
    return '😐';
}

function getSentimentBorderColor(sentiment) {
    const sent = sentiment?.toLowerCase() || 'neutral';
    if (sent.includes('positive') || sent.includes('положительн') || sent.includes('pozytywn')) return 'border-green-400';
    if (sent.includes('negative') || sent.includes('отрицательн') || sent.includes('negatywn')) return 'border-orange-400';
    if (sent.includes('urgent') || sent.includes('срочн') || sent.includes('pilne')) return 'border-red-400';
    return 'border-blue-400';
}

function handleFilterChange(event) {
    state.filter = event.target.value;
    state.visibleEmailsCount = state.emailsPerPage; // Сброс на первые 15
    render();
}

function markEmailAsReplied(emailId) {
    state.repliedEmails[emailId] = true;
    saveToLocalStorage();
    render();
}

function undoEmailReplied(emailId) {
    delete state.repliedEmails[emailId];
    saveToLocalStorage();
    render();
}

function toggleHideReplied() {
    state.hideReplied = !state.hideReplied;
    state.visibleEmailsCount = state.emailsPerPage; // Сброс на первые 15
    localStorage.setItem('hideReplied', state.hideReplied);
    render();
}

function toggleAutoResponder() {
    state.showAutoResponderModal = !state.showAutoResponderModal;
    render();
}

function setAutoResponderEnabled(enabled) {
    state.autoResponderEnabled = enabled;
    localStorage.setItem('autoResponderEnabled', enabled);
    render();
}

function setAutoResponderText(text) {
    state.autoResponderText = text;
    localStorage.setItem('autoResponderText', text);
}

function saveAutoResponderSettings() {
    state.showAutoResponderModal = false;
    render();
}

function toggleAutoResponderSwitch() {
    if (!state.autoResponderEnabled) {
        // Показываем диалог подтверждения
        state.showConfirmDialog = true;
        render();
    } else {
        // Выключаем без подтверждения
        state.autoResponderEnabled = false;
        localStorage.setItem('autoResponderEnabled', false);
        render();
    }
}

function confirmAutoResponder() {
    // Удаляем все модальные окна
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
    
    state.showConfirmDialog = false;
    state.showAutoResponderModal = true;
    render();
}

function cancelConfirm() {
    // Удаляем все модальные окна
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
    
    state.showConfirmDialog = false;
    render();
}

function setAutoResponderEnabled(enabled) {
    state.autoResponderEnabled = enabled;
    localStorage.setItem('autoResponderEnabled', enabled);
}

function setAutoResponderText(text) {
    state.autoResponderText = text;
    localStorage.setItem('autoResponderText', text);
}

function saveAutoResponderSettings() {
    // Удаляем все модальные окна
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
    
    state.autoResponderEnabled = true;
    localStorage.setItem('autoResponderEnabled', true);
    state.showAutoResponderModal = false;
    render();
}

function closeAutoResponderModal() {
    // Удаляем все модальные окна
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
    
    state.showAutoResponderModal = false;
    render();
}

// Функция автоматического ответа
async function sendAutoReply(email) {
    const emailAddress = email.from.match(/<(.+?)>/)?.[1] || email.from;
    
    try {
        const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                raw: btoa(
                    `To: ${emailAddress}\r\n` +
                    `Subject: Re: ${email.subject}\r\n` +
                    `Content-Type: text/plain; charset=utf-8\r\n\r\n` +
                    `${state.autoResponderText}`
                ).replace(/\+/g, '-').replace(/\//g, '_')
            })
        });
        
        console.log('Auto-reply sent to:', emailAddress);
    } catch (error) {
        console.error('Error sending auto-reply:', error);
    }
}

// Сделать функции глобальными
window.toggleAutoResponderSwitch = toggleAutoResponderSwitch;
window.confirmAutoResponder = confirmAutoResponder;
window.cancelConfirm = cancelConfirm;
window.setAutoResponderText = setAutoResponderText;
window.saveAutoResponderSettings = saveAutoResponderSettings;
window.closeAutoResponderModal = closeAutoResponderModal;
window.markEmailAsReplied = markEmailAsReplied;
window.undoEmailReplied = undoEmailReplied;
window.toggleHideReplied = toggleHideReplied;
window.handleSearch = handleSearch;
window.clearSearch = clearSearch;

// Render Functions
function render() {
    const app = document.getElementById('app');
    
    if (!state.user) {
        renderLoginPage(app);
    } else {
        renderEmailsView(app);
    }
    
    // ЗАМЕНИТЕ ВСЕ МОДАЛЬНЫЕ ОКНА НА ЭТО:
    
    // Диалог подтверждения
    // Диалог подтверждения
if (state.showConfirmDialog) {
    const confirmModal = document.createElement('div');
    confirmModal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;">
            <div class="bg-white rounded-xl shadow-2xl p-6 w-[450px] max-w-[90vw]">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-3xl">⚠️</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">${t('autoResponderConfirmTitle')}</h2>
                    <p class="text-gray-600">${t('autoResponderConfirmText')}</p>
                </div>

                <div class="flex gap-3">
                    <button
                        onclick="confirmAutoResponder()"
                        class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        ${t('autoResponderYes')}
                    </button>
                    <button
                        onclick="cancelConfirm()"
                        class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                    >
                        ${t('autoResponderCancel')}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(confirmModal);
}

// Модальное окно настройки автоответчика
if (state.showAutoResponderModal) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;">
            <div class="bg-white rounded-xl shadow-2xl p-6 w-[550px] max-w-[90vw]">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">🤖 ${t('autoResponderSettings')}</h2>
                
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">${t('autoResponderTextLabel')}</label>
                    <textarea
                        id="autoResponderTextarea"
                        class="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
                        placeholder="${t('autoResponderPlaceholder')}"
                        onchange="setAutoResponderText(this.value)"
                    >${state.autoResponderText}</textarea>
                    <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-xs text-blue-800">
                            <strong>ℹ️ ${t('autoResponderInfo')}</strong><br>
                            • ${t('autoResponderInfo1')}<br>
                            • ${t('autoResponderInfo2')}<br>
                            • ${t('autoResponderInfo3')}
                        </p>
                    </div>
                </div>

                <div class="flex gap-3">
                    <button
                        onclick="saveAutoResponderSettings()"
                        class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        ✅ ${t('autoResponderSave')}
                    </button>
                    <button
                        onclick="closeAutoResponderModal()"
                        class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
                    >
                        ${t('autoResponderCancel')}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
}
function renderLoginPage(app) {
    const landingTranslations = {
        en: {
            features: 'Features',
            pricing: 'Pricing',
            contact: 'Contact',
            signIn: 'Sign In',
            audienceTag: 'Built for small businesses & solo entrepreneurs',
            heroTitle: 'Effortless Email for Growing Teams.',
            heroSubtitle: 'Our AI instantly organizes your inbox, highlights urgent tasks, and drafts responses, so you can focus on what matters.',
            tryFree: 'Try Priolly Free',
            feature1Title: 'AI-Powered Sorting',
            feature1Desc: 'AI-Powered automatic sorting and powered filtering, with custom categories.',
            feature2Title: 'Urgency Detection',
            feature2Desc: 'Our AI instantly organizes your highlight urgent tasks automatically.',
            feature3Title: 'Summary',
            feature3Desc: 'Get instant AI-powered summaries of your emails and conversations.',
            pricingTitle: 'Pricing',
            freePlan: 'Free',
            freeDesc: 'Get started',
            freePrice: '$0',
            freePeriod: 'Free forever',
            freeFeature1: '100 emails per month',
            freeFeature2: 'AI-powered sorting',
            freeFeature3: 'Urgency detection',
            freeFeature4: 'No summary feature',
            freeCta: 'Get Started',
            proPlan: 'Pro',
            proDesc: 'For power users',
            proPrice: '$29',
            proPeriod: 'Per month',
            proFeature1: 'Unlimited emails',
            proFeature2: 'AI-powered sorting',
            proFeature3: 'Urgency detection',
            proFeature4: 'Full summary feature',
            proFeature5: 'Priority support',
            proCta: 'Subscribe',
            freeBannerText: 'CURRENTLY FREE',
            founderNote: "As I'm currently 17, official business registration is legally on hold for now. Anyway, I'd appreciate any feedback on how the service could be improved. Thank you.",
            contactTitle: 'Contact Us',
            contactDesc: 'Have questions? We\'d love to hear from you.',
            contactEmail: 'Email',
            contactEmailValue: 'miromarg7@gmail.com',
            contactPhone: 'Phone',
            contactPhoneValue: '+1 (555) 123-4567',
            contactAddress: 'Address',
            contactAddressValue: 'San Francisco, CA'
        },
        ru: {
            features: 'Функции',
            pricing: 'Цены',
            contact: 'Контакты',
            signIn: 'Войти',
            audienceTag: 'Для малого бизнеса и ИП',
            heroTitle: 'Простая почта для растущих команд.',
            heroSubtitle: 'Наш ИИ мгновенно организует вашу почту, выделяет срочные задачи и создаёт черновики ответов, чтобы вы могли сосредоточиться на важном.',
            tryFree: 'Попробовать бесплатно',
            feature1Title: 'ИИ-сортировка',
            feature1Desc: 'Автоматическая сортировка и фильтрация с помощью ИИ с настраиваемыми категориями.',
            feature2Title: 'Определение срочности',
            feature2Desc: 'Наш ИИ мгновенно находит и выделяет срочные задачи автоматически.',
            feature3Title: 'Саммари',
            feature3Desc: 'Мгновенные ИИ-саммари ваших писем и переписок.',
            pricingTitle: 'Цены',
            freePlan: 'Бесплатно',
            freeDesc: 'Начните сейчас',
            freePrice: '$0',
            freePeriod: 'Навсегда бесплатно',
            freeFeature1: '100 писем в месяц',
            freeFeature2: 'ИИ-сортировка',
            freeFeature3: 'Определение срочности',
            freeFeature4: 'Без функции саммари',
            freeCta: 'Начать',
            proPlan: 'Pro',
            proDesc: 'Для продвинутых',
            proPrice: '$29',
            proPeriod: 'В месяц',
            proFeature1: 'Безлимит писем',
            proFeature2: 'ИИ-сортировка',
            proFeature3: 'Определение срочности',
            proFeature4: 'Полная функция саммари',
            proFeature5: 'Приоритетная поддержка',
            proCta: 'Подписаться',
            freeBannerText: 'СЕЙЧАС БЕСПЛАТНО',
            founderNote: 'Мне сейчас 17 лет, поэтому официальная регистрация бизнеса пока недоступна по закону. Буду рад любой обратной связи о том, как улучшить сервис. Спасибо!',
            contactTitle: 'Контакты',
            contactDesc: 'Есть вопросы? Мы будем рады помочь.',
            contactEmail: 'Email',
            contactEmailValue: 'miromarg7@gmail.com',
            contactPhone: 'Телефон',
            contactPhoneValue: '+1 (555) 123-4567',
            contactAddress: 'Адрес',
            contactAddressValue: 'Сан-Франциско, CA'
        },
        pl: {
            features: 'Funkcje',
            pricing: 'Cennik',
            contact: 'Kontakt',
            signIn: 'Zaloguj',
            audienceTag: 'Dla małych firm i JDG',
            heroTitle: 'Efektywny Email dla Rosnących Zespołów.',
            heroSubtitle: 'Nasza AI natychmiast organizuje skrzynkę, wyróżnia pilne zadania i przygotowuje odpowiedzi, abyś mógł skupić się na tym, co ważne.',
            tryFree: 'Wypróbuj za darmo',
            feature1Title: 'Sortowanie AI',
            feature1Desc: 'Automatyczne sortowanie i filtrowanie z niestandardowymi kategoriami.',
            feature2Title: 'Wykrywanie Pilności',
            feature2Desc: 'Nasza AI natychmiast wyróżnia pilne zadania automatycznie.',
            feature3Title: 'Podsumowanie',
            feature3Desc: 'Natychmiastowe podsumowania AI Twoich emaili i rozmów.',
            pricingTitle: 'Cennik',
            freePlan: 'Darmowy',
            freeDesc: 'Zacznij teraz',
            freePrice: '$0',
            freePeriod: 'Na zawsze za darmo',
            freeFeature1: '100 emaili miesięcznie',
            freeFeature2: 'Sortowanie AI',
            freeFeature3: 'Wykrywanie pilności',
            freeFeature4: 'Bez funkcji podsumowania',
            freeCta: 'Rozpocznij',
            proPlan: 'Pro',
            proDesc: 'Dla zaawansowanych',
            proPrice: '$29',
            proPeriod: 'Miesięcznie',
            proFeature1: 'Nielimitowane emaile',
            proFeature2: 'Sortowanie AI',
            proFeature3: 'Wykrywanie pilności',
            proFeature4: 'Pełna funkcja podsumowania',
            proFeature5: 'Priorytetowe wsparcie',
            proCta: 'Subskrybuj',
            freeBannerText: 'TERAZ BEZPŁATNIE',
            founderNote: 'Obecnie mam 17 lat, więc oficjalna rejestracja działalności gospodarczej jest na razie prawnie niemożliwa. Będę wdzięczny za każdą opinię na temat tego, jak można ulepszyć serwis. Dziękuję!',
            contactTitle: 'Kontakt',
            contactDesc: 'Masz pytania? Chętnie pomożemy.',
            contactEmail: 'Email',
            contactEmailValue: 'miromarg7@gmail.com',
            contactPhone: 'Telefon',
            contactPhoneValue: '+1 (555) 123-4567',
            contactAddress: 'Adres',
            contactAddressValue: 'San Francisco, CA'
        }
    };
    
    const lt = landingTranslations[state.language] || landingTranslations.en;
    
    app.innerHTML = `
        <style>
            .landing-page {
                min-height: 100vh;
                background: 
                    radial-gradient(ellipse 80% 50% at 20% 60%, rgba(200, 190, 230, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 40% at 80% 40%, rgba(180, 210, 230, 0.35) 0%, transparent 50%),
                    radial-gradient(ellipse 100% 60% at 50% 80%, rgba(210, 220, 240, 0.25) 0%, transparent 40%),
                    linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                position: relative;
                overflow-x: hidden;
            }
            .landing-page::before {
                content: '';
                position: absolute;
                top: 20%;
                left: -10%;
                width: 70%;
                height: 60%;
                background: linear-gradient(135deg, rgba(180, 170, 210, 0.2) 0%, rgba(200, 190, 230, 0.15) 50%, transparent 100%);
                border-radius: 50%;
                filter: blur(60px);
                transform: rotate(-15deg);
                pointer-events: none;
            }
            .landing-page::after {
                content: '';
                position: absolute;
                top: 10%;
                right: -10%;
                width: 60%;
                height: 50%;
                background: linear-gradient(225deg, rgba(160, 200, 220, 0.25) 0%, rgba(180, 210, 230, 0.2) 50%, transparent 100%);
                border-radius: 50%;
                filter: blur(60px);
                transform: rotate(10deg);
                pointer-events: none;
            }
            .landing-nav {
                max-width: 1200px;
                margin: 0 auto;
                padding: 24px 32px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                z-index: 1;
            }
            .landing-logo {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 28px;
                font-weight: 700;
                color: #1a1a2e;
                font-family: 'Righteous', cursive;
            }
            .landing-logo svg {
                width: 36px;
                height: 36px;
            }
            .nav-links {
                display: flex;
                align-items: center;
                gap: 32px;
            }
            .nav-link {
                color: #4b5563;
                font-weight: 500;
                font-size: 15px;
                text-decoration: none;
                transition: color 0.2s;
            }
            .nav-link:hover {
                color: #1a1a2e;
            }
            .nav-signin {
                color: #1a1a2e;
                font-weight: 600;
                font-size: 15px;
                cursor: pointer;
                transition: color 0.2s;
            }
            .nav-signin:hover {
                color: #4f46e5;
            }
            .hero-section {
                text-align: center;
                padding: 20px 32px 12px;
                max-width: 900px;
                margin: 0 auto;
                position: relative;
                z-index: 1;
            }
            .hero-badge {
                display: inline-block;
                padding: 6px 16px;
                background: rgba(79, 70, 229, 0.08);
                color: #4f46e5;
                border: 1px solid rgba(79, 70, 229, 0.2);
                border-radius: 999px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: 0.01em;
                margin-bottom: 16px;
            }
            .hero-title {
                font-size: clamp(32px, 5vw, 56px);
                font-weight: 700;
                color: #1a1a2e;
                line-height: 1.1;
                margin-bottom: 12px;
                letter-spacing: -0.02em;
                white-space: nowrap;
                text-align: center;
            }
            .hero-subtitle {
                font-size: 18px;
                color: #6b7280;
                line-height: 1.6;
                max-width: 650px;
                margin: 0 auto 8px;
            }
            .app-preview {
                max-width: 1000px;
                margin: 0 auto 2px;
                padding: 0 32px;
                position: relative;
                z-index: 1;
                background: transparent;
            }
            .preview-container {
                background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                border-radius: 16px;
                padding: 24px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            }
            .preview-mockup {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .preview-header {
                background: #fafafa;
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-bottom: 1px solid #e5e7eb;
            }
            .preview-logo {
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: 600;
                color: #1a1a2e;
                font-size: 14px;
            }
            .preview-search {
                flex: 1;
                max-width: 280px;
                margin: 0 auto;
            }
            .preview-search input {
                width: 100%;
                padding: 6px 12px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                font-size: 12px;
                background: white;
            }
            .preview-content {
                display: flex;
                min-height: 280px;
            }
            .preview-main {
                flex: 1;
                padding: 0;
            }
            .preview-table-header {
                display: grid;
                grid-template-columns: 2fr 3fr 1.5fr 1fr;
                padding: 8px 16px;
                background: #fafafa;
                border-bottom: 1px solid #e5e7eb;
                font-size: 10px;
                font-weight: 600;
                color: #6b7280;
                text-transform: uppercase;
            }
            .preview-row {
                display: grid;
                grid-template-columns: 2fr 3fr 1.5fr 1fr;
                padding: 10px 16px;
                border-bottom: 1px solid #f3f4f6;
                align-items: center;
                font-size: 12px;
            }
            .preview-row:hover {
                background: #fafafa;
            }
            .preview-avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 11px;
                font-weight: 600;
                margin-right: 8px;
            }
            .preview-sender {
                display: flex;
                align-items: center;
                font-weight: 500;
                color: #1a1a2e;
            }
            .preview-subject {
                color: #4b5563;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .preview-tag {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: 500;
            }
            .tag-complaint { background: #fef2f2; color: #dc2626; }
            .tag-positive { background: #f0fdf4; color: #16a34a; }
            .tag-negative { background: #fef3c7; color: #d97706; }
            .tag-question { background: #eff6ff; color: #2563eb; }
            .tag-suggestion { background: #f5f3ff; color: #7c3aed; }
            .tag-spam { background: #f3f4f6; color: #6b7280; }
            .preview-date {
                color: #9ca3af;
                font-size: 11px;
                text-align: right;
            }
            .preview-sidebar {
                width: 200px;
                background: #fafafa;
                border-left: 1px solid #e5e7eb;
                padding: 16px;
            }
            .sidebar-title {
                font-size: 12px;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 12px;
            }
            .sidebar-name {
                font-size: 11px;
                color: #4b5563;
                margin-bottom: 12px;
            }
            .sidebar-tags-title {
                font-size: 10px;
                color: #9ca3af;
                margin-bottom: 6px;
            }
            .sidebar-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                margin-bottom: 12px;
            }
            .sidebar-tag {
                font-size: 9px;
                padding: 2px 6px;
                border-radius: 8px;
            }
            .features-section {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 32px 40px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
            }
            @media (max-width: 768px) {
                .features-section {
                    grid-template-columns: 1fr;
                }
                .nav-links {
                    display: none;
                }
            }
            .feature-card {
                background: #f9fafb;
                border-radius: 16px;
                padding: 24px;
                display: flex;
                gap: 16px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            .feature-icon {
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .feature-icon img {
                width: 48px;
                height: 48px;
                object-fit: contain;
            }
            .feature-content h3 {
                font-size: 16px;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 6px;
            }
            .feature-content p {
                font-size: 13px;
                color: #6b7280;
                line-height: 1.5;
            }
            .cta-section {
                text-align: center;
                padding: 0 32px 60px;
            }
            .cta-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: #1a1a2e;
                color: white;
                padding: 16px 48px;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                border: none;
                transition: all 0.2s;
                box-shadow: 0 4px 14px rgba(26, 26, 46, 0.25);
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(26, 26, 46, 0.35);
            }
            .lang-switcher-landing {
                display: flex;
                gap: 4px;
                margin-left: 24px;
                padding-left: 24px;
                border-left: 1px solid #e5e7eb;
            }
            .lang-btn-landing {
                padding: 6px 10px;
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                background: transparent;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .lang-btn-landing:hover {
                color: #1a1a2e;
            }
            .lang-btn-landing.active {
                background: #f3f4f6;
                color: #1a1a2e;
            }
            
            /* Pricing Section */
            .pricing-section {
                background: transparent;
                padding: 60px 32px;
                margin-top: 40px;
            }
            .pricing-title {
                text-align: center;
                font-size: 42px;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 48px;
                font-family: 'Righteous', cursive;
            }
            .pricing-cards {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
                max-width: 900px;
                margin: 0 auto;
                pointer-events: none;
            }
            @media (max-width: 768px) {
                .pricing-cards {
                    grid-template-columns: 1fr;
                }
            }
            .pricing-card {
                background: #ffffff;
                border-radius: 16px;
                padding: 32px;
                border: 1px solid #e5e7eb;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            }
            .pricing-card.featured {
                border-color: #4f46e5;
                border-width: 2px;
                position: relative;
            }
            .pricing-card-icon {
                width: 48px;
                height: 48px;
                margin-bottom: 20px;
            }
            .pricing-card-icon svg {
                width: 100%;
                height: 100%;
                color: #6b7280;
            }
            .pricing-card h3 {
                font-size: 28px;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 4px;
            }
            .pricing-card-desc {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 20px;
            }
            .pricing-card-price {
                font-size: 36px;
                font-weight: 700;
                color: #1a1a2e;
                margin-bottom: 4px;
            }
            .pricing-card-period {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 24px;
            }
            .pricing-card-btn {
                width: 100%;
                padding: 14px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: default;
                border: 1px solid #e5e7eb;
                background: #f9fafb;
                color: #1a1a2e;
                margin-bottom: 24px;
            }
            .pricing-card.featured .pricing-card-btn {
                background: #1a1a2e;
                color: #ffffff;
                border: none;
            }
            .pricing-card-features {
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
            }
            .pricing-card-features-title {
                font-size: 14px;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 16px;
            }
            .pricing-card-feature {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-bottom: 12px;
                font-size: 14px;
                color: #4b5563;
            }
            .pricing-card-feature span:first-child {
                color: #4f46e5;
                font-weight: 600;
                flex-shrink: 0;
            }
            .pricing-card-feature.disabled {
                color: #9ca3af;
                text-decoration: line-through;
            }
            .pricing-card-feature.disabled span:first-child {
                color: #d1d5db;
            }

            /* Free promo ribbons crossing the pricing cards */
            .pricing-ribbons-wrap {
                position: relative;
            }
            .pricing-ribbon {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 130%;
                height: 46px;
                margin-left: -65%;
                margin-top: -23px;
                background: #111114;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                white-space: nowrap;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
                z-index: 5;
                pointer-events: none;
            }
            .pricing-ribbon span {
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 3px;
                text-transform: uppercase;
            }
            .pricing-ribbon-1 {
                transform: rotate(-14deg);
            }
            .pricing-ribbon-2 {
                transform: rotate(14deg);
            }
            .pricing-ribbon-badge {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 230px;
                padding: 18px 20px 20px;
                background: #000000;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
                z-index: 6;
                pointer-events: none;
            }
            .pricing-ribbon-badge-photo {
                width: 68px;
                height: 68px;
                border-radius: 10px;
                object-fit: cover;
                background: #232329;
                border: 2px solid rgba(255, 255, 255, 0.18);
                margin-bottom: 12px;
                flex-shrink: 0;
            }
            .pricing-ribbon-badge-text {
                color: #ffffff;
                font-size: 16px;
                line-height: 1.55;
                font-weight: 400;
                text-align: center;
                letter-spacing: 0.1px;
            }
            @media (max-width: 768px) {
                .pricing-ribbon {
                    height: 34px;
                    width: 145%;
                    margin-left: -72.5%;
                    margin-top: -17px;
                }
                .pricing-ribbon span {
                    font-size: 11px;
                    letter-spacing: 2px;
                }
                .pricing-ribbon-1 {
                    transform: rotate(-20deg);
                }
                .pricing-ribbon-2 {
                    transform: rotate(20deg);
                }
                .pricing-ribbon-badge {
                    width: 180px;
                    padding: 14px 16px 16px;
                }
                .pricing-ribbon-badge-photo {
                    width: 52px;
                    height: 52px;
                    border-radius: 8px;
                    margin-bottom: 10px;
                }
                .pricing-ribbon-badge-text {
                    font-size: 11px;
                    line-height: 1.5;
                }
            }
            
            /* Contact Section */
            .contact-section {
                padding: 80px 32px;
                text-align: center;
                max-width: 600px;
                margin: 0 auto;
            }
            .contact-title {
                font-size: 32px;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 16px;
            }
            .contact-desc {
                font-size: 16px;
                color: #6b7280;
                margin-bottom: 48px;
            }
            .contact-info {
                display: flex;
                flex-direction: column;
                gap: 24px;
                align-items: center;
            }
            .contact-item {
                font-size: 16px;
                color: #4b5563;
            }
            .contact-item a {
                color: #1a1a2e;
                text-decoration: none;
                border-bottom: 1px solid #e5e7eb;
                transition: border-color 0.2s;
            }
            .contact-item a:hover {
                border-color: #1a1a2e;
            }
        </style>
        
        <div class="landing-page">
            <!-- Navigation -->
            <nav class="landing-nav">
                <div class="landing-logo">
                    <img src="/priolly.png" alt="Priolly" style="height: 40px; width: auto;" />
                </div>
                <div class="nav-links">
                    <a href="javascript:void(0)" onclick="smoothScrollTo('pricing')" class="nav-link">${lt.pricing}</a>
                    <a href="javascript:void(0)" onclick="smoothScrollTo('contact')" class="nav-link">${lt.contact}</a>
                    <span class="nav-signin" onclick="handleLogin()">${lt.signIn}</span>
                    <div class="lang-switcher-landing">
                        <button onclick="changeLanguage('en')" class="lang-btn-landing ${state.language === 'en' ? 'active' : ''}">EN</button>
                        <button onclick="changeLanguage('pl')" class="lang-btn-landing ${state.language === 'pl' ? 'active' : ''}">PL</button>
                        <button onclick="changeLanguage('ru')" class="lang-btn-landing ${state.language === 'ru' ? 'active' : ''}">RU</button>
                    </div>
                </div>
            </nav>
            
            <!-- Hero Section -->
            <section class="hero-section">
                <span class="hero-badge">${lt.audienceTag}</span>
                <h1 class="hero-title">${lt.heroTitle}</h1>
                <p class="hero-subtitle">${lt.heroSubtitle}</p>
            </section>
            
            <!-- App Preview -->
            <div class="app-preview">
                <div class="preview-images-container" style="display: flex; gap: 24px; justify-content: center; align-items: flex-start; flex-wrap: wrap; background: transparent; padding-left: 40px;">
                    <div class="preview-image-wrapper" style="flex: 1; max-width: 900px; min-width: 300px; background: transparent;">
                        <img src="/inbox.png" alt="Inbox Preview" style="width: 100%; border-radius: 16px; background: transparent;" />
                    </div>
                </div>
            </div>
            
            <!-- Features -->
            <section class="features-section" id="features">
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/sort.png" alt="Sort" />
                    </div>
                    <div class="feature-content">
                        <h3>${lt.feature1Title}</h3>
                        <p>${lt.feature1Desc}</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/urgency.png" alt="Urgency" />
                    </div>
                    <div class="feature-content">
                        <h3>${lt.feature2Title}</h3>
                        <p>${lt.feature2Desc}</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <img src="/summary.png" alt="Summary" />
                    </div>
                    <div class="feature-content">
                        <h3>${lt.feature3Title}</h3>
                        <p>${lt.feature3Desc}</p>
                    </div>
                </div>
            </section>
            
            <!-- CTA -->
            <section class="cta-section">
                <button class="cta-button" onclick="handleLogin()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    ${lt.tryFree}
                </button>
            </section>
            
            <!-- Pricing -->
            <section class="pricing-section" id="pricing">
                <h2 class="pricing-title">${lt.pricingTitle}</h2>
                <div class="pricing-ribbons-wrap">
                <div class="pricing-cards">
                    <!-- Free Plan -->
                    <div class="pricing-card">
                        <h3>${lt.freePlan}</h3>
                        <p class="pricing-card-desc">${lt.freeDesc}</p>
                        <div class="pricing-card-price">${lt.freePrice}</div>
                        <p class="pricing-card-period">${lt.freePeriod}</p>
                        <button class="pricing-card-btn" disabled tabindex="-1">${lt.freeCta}</button>
                        <div class="pricing-card-features">
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.freeFeature1}</span>
                            </div>
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.freeFeature2}</span>
                            </div>
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.freeFeature3}</span>
                            </div>
                            <div class="pricing-card-feature disabled">
                                <span>✗</span>
                                <span>${lt.freeFeature4}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pro Plan -->
                    <div class="pricing-card featured">
                        <h3>${lt.proPlan}</h3>
                        <p class="pricing-card-desc">${lt.proDesc}</p>
                        <div class="pricing-card-price">${lt.proPrice}</div>
                        <p class="pricing-card-period">${lt.proPeriod}</p>
                        <button class="pricing-card-btn" disabled tabindex="-1">${lt.proCta}</button>
                        <div class="pricing-card-features">
                            <div class="pricing-card-features-title">Everything in Free, plus:</div>
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.proFeature1}</span>
                            </div>
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.proFeature4}</span>
                            </div>
                            <div class="pricing-card-feature">
                                <span>✓</span>
                                <span>${lt.proFeature5}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pricing-ribbon pricing-ribbon-1"><span>${Array(6).fill(lt.freeBannerText).join('   •   ')}</span></div>
                <div class="pricing-ribbon pricing-ribbon-2"><span>${Array(6).fill(lt.freeBannerText).join('   •   ')}</span></div>
                <div class="pricing-ribbon-badge">
                    <span class="pricing-ribbon-badge-text">${lt.founderNote}</span>
                </div>
                </div>
            </section>
            
            <!-- Contact -->
            <section class="contact-section" id="contact">
                <h2 class="contact-title">${lt.contactTitle}</h2>
                <p class="contact-desc">${lt.contactDesc}</p>
                <div class="contact-info">
                    <div class="contact-item">
                        <a href="mailto:${lt.contactEmailValue}">${lt.contactEmailValue}</a>
                    </div>
                    <div class="contact-item">
                        <a href="tel:+48572010898">+48 572 010 898</a>
                    </div>
                </div>
            </section>
        </div>
    `;
    
    // Smooth scroll for anchor links
    setTimeout(function() {
        var links = document.querySelectorAll('a[href^="#"]');
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                if (targetId && targetId !== '#') {
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }, 100);
}
function renderHeader() {
    return `
        <style>
            /* Переключатель языков */
            .lang-switcher {
                display: flex;
                background-color: #dbdde0ff;
                padding: 4px;
                border-radius: 12px;
                gap: 2px;
            }

            .lang-btn {
                border: none;
                background: transparent;
                padding: 6px 14px;
                font-size: 14px;
                font-weight: 700;
                color: #6b7280;
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.2s ease-in-out;
            }

            .lang-btn.active {
                background-color: #ffffff;
                color: #000000;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .lang-btn:hover:not(.active) {
                color: #000;
            }

            /* Разделитель */
            .header-divider {
                width: 1px;
                height: 28px;
                background-color: #d1d5db;
            }

            /* Профиль */
            .user-profile {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: opacity 0.2s;
            }

            .user-profile:hover {
                opacity: 0.8;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .username {
                font-size: 16px;
                font-weight: 700;
                color: #111;
            }
        </style>
        
        <header class="bg-white shadow-sm border-b-2 border-gray-200">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                            <img src="/priolly.png" alt="Priolly" class="h-10 w-auto object-contain" />
                            <h1 class="sr-only">${t('mailInsights')}</h1>
                    </div>
                    
                    <div class="flex items-center gap-5">
                        
                        <!-- Переключатель языков -->
                        <div class="lang-switcher">
                            <button onclick="changeLanguage('en')" class="lang-btn ${state.language === 'en' ? 'active' : ''}">EN</button>
                            <button onclick="changeLanguage('pl')" class="lang-btn ${state.language === 'pl' ? 'active' : ''}">PL</button>
                            <button onclick="changeLanguage('ru')" class="lang-btn ${state.language === 'ru' ? 'active' : ''}">RU</button>
                        </div>
                        
                        <!-- Разделитель -->
                        <div class="header-divider"></div>
                        
                        <!-- Профиль -->
                        <div class="user-profile">
                            <img src="${state.user.picture}" alt="${state.user.name}" class="user-avatar">
                            <span class="username">${state.user.name}</span>
                        </div>
                        
                        <!-- Выход -->
                        <button onclick="handleLogout()" class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
            </div>
        </header>
    `;
}

function getUnrepliedEmailsInfo(emails) {
    const unrepliedEmails = emails.filter(email => {
        const category = (email.category || '').toLowerCase();
        const isSpam = category.includes('spam') || category.includes('спам');
        const isReplied = state.repliedEmails[email.id];
        return !isSpam && !isReplied;
    });
    
    if (unrepliedEmails.length === 0) {
        return { 
            count: 0, 
            color: '#10b981', 
            borderColor: 'border-green-500', 
            bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50', 
            textColor: 'text-green-800',
            icon: '✅',
            message: true
        };
    }
    
    // Находим максимальный приоритет среди неотвеченных
    let maxPriority = { level: 'low', score: 0 };
    unrepliedEmails.forEach(email => {
        const priority = calculateEmailPriority(email);
        if (priority.score > maxPriority.score) {
            maxPriority = priority;
        }
    });
    
    let borderColor, bgColor, textColor, icon;
    switch(maxPriority.level) {
        case 'critical':
            borderColor = 'border-red-500';
            bgColor = 'bg-gradient-to-r from-red-50 to-rose-50';
            textColor = 'text-red-800';
            icon = '🔥';
            break;
        case 'high':
            borderColor = 'border-amber-500';
            bgColor = 'bg-gradient-to-r from-amber-50 to-orange-50';
            textColor = 'text-amber-800';
            icon = '⚠️';
            break;
        case 'normal':
            borderColor = 'border-blue-500';
            bgColor = 'bg-gradient-to-r from-blue-50 to-indigo-50';
            textColor = 'text-blue-800';
            icon = '📧';
            break;
        default:
            borderColor = 'border-green-500';
            bgColor = 'bg-gradient-to-r from-green-50 to-emerald-50';
            textColor = 'text-green-800';
            icon = '💬';
    }
    
    return {
        count: unrepliedEmails.length,
        color: maxPriority.color,
        borderColor,
        bgColor,
        textColor,
        icon,
        message: false
    };
}

function renderEmailsView(app) {
    const emailsWithCategories = state.emails.map(email => ({
        ...email,
        category: state.classifiedEmails[email.id] || email.category || null
    }));
    
    // Применяем фильтры
    let filteredEmails = state.filter === 'all' 
        ? emailsWithCategories 
        : emailsWithCategories.filter(e => e.category && matchesCategory(e.category, state.filter));

    // Применяем поиск
    filteredEmails = filterEmailsBySearch(filteredEmails);

    // Сортировка
    if (state.sortMode === 'priority') {
        filteredEmails = sortEmailsByPriority(filteredEmails);
    } else {
        filteredEmails = [...filteredEmails].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Скрываем отвеченные если нужно
    if (state.hideReplied) {
        filteredEmails = filteredEmails.filter(email => !state.repliedEmails[email.id]);
    }
    
    const visibleEmails = filteredEmails;
    
    // Проверяем есть ли ещё незагруженные письма
    const loadedIds = new Set(state.emails.map(e => e.id));
    const remainingCount = state.allMessageIds.filter(id => !loadedIds.has(id)).length;
    const hasMoreEmails = remainingCount > 0;

    const classifiedCount = Object.keys(state.classifiedEmails).length;
    const unrepliedInfo = getUnrepliedEmailsInfo(visibleEmails);

    app.innerHTML = `
        <div class="min-h-screen">
            ${renderHeader()}
            <main class="max-w-7xl mx-auto px-4 py-3">
                <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
    
    <!-- ПОИСКОВАЯ ПАНЕЛЬ -->
    <div class="mb-4">
        <div class="relative">
            <input 
                type="text" 
                id="searchInput"
                placeholder="${state.language === 'ru' ? 'Поиск по теме, отправителю или содержанию...' : state.language === 'pl' ? 'Szukaj po temacie, nadawcy lub treści...' : 'Search by subject, sender or content...'}"
                value="${state.searchQuery}"
                class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                oninput="handleSearch(this.value)"
            />
            <svg class="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
    </div>
    
    <!-- ОДНА СТРОКА: Автоответчик + Предупреждение + Фильтры + Кнопка -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
        <!-- Левая группа: Автоответчик + Предупреждение -->
        <div class="flex items-center gap-4">
            <!-- Автоответчик с переключателем -->
            <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-700">Auto-responder</span>
                <label class="relative inline-block w-12 h-6 cursor-pointer">
                    <input 
                        type="checkbox" 
                        ${state.autoResponderEnabled ? 'checked' : ''}
                        onchange="toggleAutoResponderSwitch()"
                        class="opacity-0 w-0 h-0"
                    />
                    <span class="absolute cursor-pointer inset-0 rounded-full transition-colors ${state.autoResponderEnabled ? 'bg-green-500' : 'bg-gray-300'}">
                        <span class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${state.autoResponderEnabled ? 'transform translate-x-6' : ''}"></span>
                    </span>
                </label>
            </div>
            
            <!-- Предупреждение о письмах -->
            <div class="flex items-center gap-2">
                ${unrepliedInfo.count > 0 ? `
                    <svg class="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">${unrepliedInfo.count} emails awaiting reply</span>
                ` : ''}
            </div>
        </div>
        
        <!-- Правая группа: Фильтры + Кнопка -->
        <div class="flex items-center gap-2">
            <!-- Фильтр категорий -->
            <select onchange="handleFilterChange(event)" class="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                <option value="all" ${state.filter === 'all' ? 'selected' : ''}>${t('allCategories')}</option>
                <option value="complaint" ${state.filter === 'complaint' ? 'selected' : ''}>${t('complaint')}</option>
                <option value="positive" ${state.filter === 'positive' ? 'selected' : ''}>${t('positive')}</option>
                <option value="negative" ${state.filter === 'negative' ? 'selected' : ''}>${t('negative')}</option>
                <option value="suggestion" ${state.filter === 'suggestion' ? 'selected' : ''}>${t('suggestion')}</option>
                <option value="spam" ${state.filter === 'spam' ? 'selected' : ''}>${t('spam')}</option>
            </select>
            
            <!-- Сортировка -->
            <select onchange="toggleSortMode()" class="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                <option value="date" ${state.sortMode === 'date' ? 'selected' : ''}>${t('sortByDate')}</option>
                <option value="priority" ${state.sortMode === 'priority' ? 'selected' : ''}>${t('sortByPriority')}</option>
            </select>
            
            <!-- Кнопка обновления -->
            <button onclick="fetchEmails()" ${state.loading ? 'disabled' : ''} 
                class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50">
                <svg class="w-5 h-5 ${state.loading ? 'animate-spin' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                ${state.loading ? t('loading') : t('refreshEmails')}
            </button>
        </div>
    </div>
</div>

                <!-- Таблица писем -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-300">
                    ${visibleEmails.length === 0 ? `
                        <div class="text-center py-12 text-gray-500">
                            ${state.searchQuery ? `
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <p class="text-lg font-medium">
                                    ${state.language === 'ru' ? 'Ничего не найдено' : state.language === 'pl' ? 'Nic nie znaleziono' : 'No results found'}
                                </p>
                                <p class="text-sm mt-2">
                                    ${state.language === 'ru' ? 'Попробуйте изменить запрос или очистить поиск' : 
                                      state.language === 'pl' ? 'Spróbuj zmienić zapytanie lub wyczyścić wyszukiwanie' : 
                                      'Try changing your query or clearing the search'}
                                </p>
                            ` : `
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <p>${t('noEmails')}</p>
                                <p class="text-sm mt-2">${t('clickRefresh')}</p>
                            `}
                        </div>
                    ` : `
                        <!-- Header -->
                        <div class="px-6 py-3 bg-gray-50 border-b border-gray-300">
                            <div class="flex items-center gap-4 text-xs font-medium text-gray-500 uppercase">
                                <div class="w-3 flex-shrink-0"></div>
                                <div class="w-11 flex-shrink-0"></div>
                                <div class="w-32 flex-shrink-0">Sender</div>
                                <div class="w-32 flex-shrink-0">Category</div>
                                <div class="flex-1 min-w-0">Subject</div>
                                <div class="w-20 flex-shrink-0 text-right">Time</div>
                            </div>
                        </div>
                        
                        <!-- Email List -->
                        <div class="divide-y divide-neutral-200">
                            ${visibleEmails.map(email => {
                                const priority = calculateEmailPriority(email);
                                const isReplied = state.repliedEmails[email.id];
                                const category = (email.category || '').toLowerCase();
                                const isSpam = category.includes('spam') || category.includes('спам');
                                const rowOpacity = isReplied ? 'opacity-50' : '';
                                
                                // Подсветка поискового запроса
                                let highlightedSubject = email.subject;
                                let highlightedSender = email.from.split('<')[0].trim();
                                
                                if (state.searchQuery) {
                                    const regex = new RegExp(`(${state.searchQuery})`, 'gi');
                                    if (state.searchType === 'subject' || state.searchType === 'all') {
                                        highlightedSubject = highlightedSubject.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
                                    }
                                    if (state.searchType === 'sender' || state.searchType === 'all') {
                                        highlightedSender = highlightedSender.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
                                    }
                                }
                                
                                // Получаем инициалы для аватарки
                                const senderName = email.from.split('<')[0].trim();
                                const nameParts = senderName.split(' ').filter(n => n.length > 0);
                                let initials = '';
                                if (nameParts.length >= 2) {
                                    initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
                                } else if (nameParts.length === 1) {
                                    initials = nameParts[0].slice(0, 2).toUpperCase();
                                } else {
                                    initials = email.from.slice(0, 2).toUpperCase();
                                }
                                
                                // Красивые градиентные цвета для аватарок
                                const avatarGradients = [
                                    'bg-gradient-to-br from-orange-400 to-orange-600',
                                    'bg-gradient-to-br from-blue-400 to-blue-600',
                                    'bg-gradient-to-br from-green-400 to-green-600',
                                    'bg-gradient-to-br from-purple-400 to-purple-600',
                                    'bg-gradient-to-br from-pink-400 to-pink-600',
                                    'bg-gradient-to-br from-indigo-400 to-indigo-600',
                                    'bg-gradient-to-br from-red-400 to-red-600',
                                    'bg-gradient-to-br from-yellow-400 to-yellow-600',
                                    'bg-gradient-to-br from-teal-400 to-teal-600',
                                    'bg-gradient-to-br from-cyan-400 to-cyan-600',
                                ];
                                
                                // Используем email для стабильного цвета
                                const emailHash = email.from.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                const avatarGradient = avatarGradients[emailHash % avatarGradients.length];
                                
                                return `
                                <div class="group relative px-6 py-4 hover:bg-gray-50 transition-colors ${rowOpacity} cursor-pointer">
                                    <div class="flex items-center gap-4">
                                        <!-- Priority Dot -->
                                        <div class="w-3 h-3 rounded-full flex-shrink-0" style="background-color: ${priority.color}"></div>
                                        
                                        <!-- Аватарка -->
                                        <div class="w-11 h-11 rounded-full ${avatarGradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                                            ${initials}
                                        </div>
                                        
                                        <!-- Имя отправителя -->
                                        <div class="w-32 flex-shrink-0">
                                            <p class="text-sm font-medium text-gray-700 truncate">
                                                ${highlightedSender}
                                            </p>
                                        </div>
                                        
                                        <!-- Категория -->
                                        <div class="w-32 flex-shrink-0">
                                            <span class="px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(email.category || 'unknown')}">
                                                ${translateCategory(email.category || 'unknown')}
                                            </span>
                                        </div>
                                        
                                        <!-- Тема письма -->
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm text-gray-900 truncate">
                                                ${highlightedSubject}
                                                ${isReplied ? `<span class="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">✓ ${t('replied')}</span>` : ''}
                                            </p>
                                        </div>
                                        
                                        <!-- Дата -->
                                        <div class="w-20 flex-shrink-0 text-sm text-gray-500 text-right">
                                            ${formatDate(email.date)}
                                        </div>
                                        
                                        <!-- Кнопки при наведении -->
                                        <div class="hidden group-hover:flex items-center gap-1 absolute right-6 top-1/2 -translate-y-1/2 bg-white pl-3">
                                            <a href="${email.link}" target="_blank" class="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-sm font-medium transition">
                                                ${t('open')}
                                            </a>
                                            <button onclick="event.stopPropagation(); showSummary('${email.id}')" class="px-3 py-1.5 bg-white hover:bg-gray-50 text-indigo-500 rounded-full text-sm font-medium transition border border-gray-300 flex items-center gap-1.5 ml-1">
                                                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                ${t('summary')}
                                            </button>
                                            ${!isSpam ? (
                                                isReplied ? `
                                                <button onclick="event.stopPropagation(); undoEmailReplied('${email.id}')" class="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition">
                                                    ${t('undoReplied')}
                                                </button>
                                                ` : `
                                                <button onclick="event.stopPropagation(); markEmailAsReplied('${email.id}')" class="px-3 py-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition">
                                                    ${t('markAsReplied')}
                                                </button>
                                                `
                                            ) : ''}
                                        </div>
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                        
                        ${hasMoreEmails ? `
                            <div class="p-4 border-t bg-gray-50 text-center">
                                <button 
                                    onclick="showMoreEmails()" 
                                    ${state.classifyingMore ? 'disabled' : ''}
                                    class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 mx-auto disabled:opacity-50"
                                >
                                    ${state.classifyingMore ? `
                                        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                        ${t('classifying')}
                                    ` : `
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                        ${t('showMore')} ${Math.min(state.emailsPerPage, remainingCount)}
                                    `}
                                </button>
                            </div>
                        ` : ''}
                    `}
                </div>
            </main>
        </div>
    `;
}

// Show Summary Modal
async function showSummary(emailId) {
    const email = state.emails.find(e => e.id === emailId);
    if (!email) return;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'summary-modal';
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    
    // Loading state
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
            <div class="p-6 flex items-center justify-center">
                <svg class="w-8 h-8 animate-spin text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span class="ml-3 text-gray-600">${t('loading')}</span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    try {
        // Если письмо не классифицировано - классифицируем сейчас
        const currentCategory = state.classifiedEmails[email.id];
        let category = currentCategory;
        
        if (!currentCategory || currentCategory === 'Unknown') {
            category = await classifyEmail(email.snippet, email.id);
            state.classifiedEmails[email.id] = category;
            email.category = category;
            saveToLocalStorage();
            render(); // Обновляем UI чтобы показать новую категорию
        }
        
        const response = await fetch(`${API_BASE_URL}/summary`, {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify({
                snippet: email.snippet || email.subject,
                subject: email.subject,
                category: category,
                language: state.language,
                emailId: email.id  // Для кэширования на сервере
            })
        });
        
        const data = await response.json();
        const summary = data.summary || {};
        
        // Sentiment colors
        const sentimentColors = {
            positive: 'bg-green-100 text-green-800',
            negative: 'bg-red-100 text-red-800',
            urgent: 'bg-orange-100 text-orange-800',
            neutral: 'bg-gray-100 text-gray-800'
        };
        
        const sentimentLabels = {
            ru: { positive: 'Позитивное', negative: 'Негативное', urgent: 'Срочное', neutral: 'Нейтральное' },
            en: { positive: 'Positive', negative: 'Negative', urgent: 'Urgent', neutral: 'Neutral' },
            pl: { positive: 'Pozytywne', negative: 'Negatywne', urgent: 'Pilne', neutral: 'Neutralne' }
        };
        
        const sentimentLabel = sentimentLabels[state.language]?.[summary.sentiment] || summary.sentiment || 'Neutral';
        const sentimentColor = sentimentColors[summary.sentiment] || sentimentColors.neutral;
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
                <!-- Header -->
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-white font-semibold text-lg">${t('summary')}</h3>
                        <button onclick="document.getElementById('summary-modal').remove()" class="text-white/80 hover:text-white transition">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <p class="text-white/80 text-sm mt-1 truncate">${email.subject}</p>
                </div>
                
                <!-- Content -->
                <div class="p-6 space-y-4">
                    <!-- Brief -->
                    <div>
                        <p class="text-gray-700 leading-relaxed">${summary.brief || email.snippet || 'No summary available'}</p>
                    </div>
                    
                    <!-- Sentiment & Action -->
                    <div class="flex items-center gap-3">
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${sentimentColor}">
                            ${sentimentLabel}
                        </span>
                        ${summary.actionRequired ? `
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                ⚡ ${t('actionRequired')}
                            </span>
                        ` : ''}
                    </div>
                    
                    <!-- Key Points -->
                    ${summary.keyPoints && summary.keyPoints.length > 0 ? `
                        <div>
                            <h4 class="text-sm font-medium text-gray-500 mb-2">${t('keyPoints')}</h4>
                            <ul class="space-y-2">
                                ${summary.keyPoints.map(point => `
                                    <li class="flex items-start gap-2 text-sm text-gray-600">
                                        <span class="text-indigo-500 mt-1">•</span>
                                        <span>${point}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Footer -->
                <div class="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                    <a href="${email.link}" target="_blank" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                        ${t('open')}
                    </a>
                    <button onclick="document.getElementById('summary-modal').remove()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
                        ${t('autoResponderCancel')}
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching summary:', error);
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6">
                <p class="text-red-600">Error loading summary. Please try again.</p>
                <button onclick="document.getElementById('summary-modal').remove()" class="mt-4 px-4 py-2 bg-gray-200 rounded-lg">Close</button>
            </div>
        `;
    }
}

// Initialize App
window.initApp = function() {
    loadFromLocalStorage();
    render();
}

// Make functions global
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.fetchEmails = fetchEmails;
window.changeLanguage = changeLanguage;
window.changeView = changeView;
window.toggleContact = toggleContact;
window.handleFilterChange = handleFilterChange;
window.showMoreEmails = showMoreEmails;
window.showSummary = showSummary;

// Smooth scroll function
window.smoothScrollTo = function(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        var startPosition = window.pageYOffset;
        var targetPosition = element.getBoundingClientRect().top + startPosition;
        var distance = targetPosition - startPosition;
        var duration = 800;
        var startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var progress = Math.min(timeElapsed / duration, 1);
            var ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, startPosition + distance * ease);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    }
};
