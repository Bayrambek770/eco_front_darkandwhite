import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getApiLanguage, setApiLanguage, type Lang } from '@/api/lang';

const resources = {
  ru: {
    translation: {
      nav: { home: 'Главная', about: 'О нас', products: 'Товары', publicOffer: 'Публичная оферта', news: 'Новости', contact: 'Контакты', cart: 'Корзина' },
      publicOffer: {
        title: 'Публичная оферта',
        subtitle: 'Краткая и структурированная оферта, применимая к любому онлайн-сервису.',
        labels: {
          companyName: 'Наименование компании', tin: 'ИНН', address: 'Юридический адрес', tel: 'Телефон', whatsapp: 'WhatsApp', email: 'Email', bankName: 'Банк', mfo: 'МФО', swift: 'SWIFT',
        },
        sections: {
          introduction: {
            title: '1. Введение',
            body: 'Настоящий документ является публичной офертой. Принятие (акцепт) оферты посредством использования сайта и/или оформления заказа создает юридически обязательный договор между пользователем и компанией.',
          },
          services: {
            title: '2. Услуги',
            body: 'Сайт предоставляет онлайн‑сервисы и/или доступ к товарам, включая просмотр информации, оформление заказов, оплату и коммуникацию с поддержкой.',
            list: [
              'Доступ к контенту и функционалу сайта',
              'Оформление и отслеживание заказов',
              'Коммуникация через формы обратной связи',
            ],
          },
          userObligations: {
            title: '3. Обязанности пользователя',
            body: 'Пользователь обязуется использовать сервис добросовестно и соблюдать действующее законодательство.',
            list: [
              'Предоставлять точную и актуальную информацию',
              'Не нарушать безопасность и работоспособность сайта',
              'Не использовать сервис для незаконной деятельности',
            ],
          },
          companyRights: {
            title: '4. Права компании',
            body: 'Компания оставляет за собой право изменять условия оферты, функционал сервиса и приостанавливать доступ при нарушении правил.',
            list: [
              'Изменение условий без предварительного уведомления',
              'Временная или постоянная блокировка аккаунта при нарушениях',
              'Модерация и удаление контента, нарушающего правила',
            ],
          },
          payments: {
            title: '5. Платежи',
            body: 'Если применимо: все платежи считаются окончательными и не подлежат возврату, за исключением случаев, предусмотренных законодательством.',
          },
          liability: {
            title: '6. Ограничение ответственности',
            body: 'Компания не несет ответственности за неправомерное использование сервиса пользователями, сбои сторонних сервисов, форс‑мажор и иные внешние факторы вне контроля компании.',
          },
          governingLaw: {
            title: '7. Применимое право',
            body: 'Настоящее соглашение регулируется применимым законодательством соответствующей юрисдикции. Споры подлежат разрешению в компетентном суде по месту регистрации компании, если иное не предусмотрено законом.',
          },
          contact: {
            title: '8. Контакты и реквизиты',
            body: 'Для связи используйте следующие контактные данные и реквизиты компании.',
          },
        },
        company: {
          companyName: '"PREMIUM GOLD ONLINE TRADING" MCHJ',
          tin: '310329897',
          address: 'Farg‘ona viloyati, Marg‘ilon shahri, Uzun Xovuz MFY, Eshon Said ko‘chasi, 6-uy',
          tel: '+998-99-866-77-99',
          whatsapp: '+998-98-307-21-01',
          email: 'uzcomp@inbox.eu',
          bankName: '[Your Bank Name]',
          mfo: '[Bank MFO]',
          swift: '[Bank SWIFT]',
        },
        bank: {
          title: 'Банковские счета',
          columns: { currency: 'Валюта', account: 'Номер счета', opened: 'Открыт' },
          rows: [
            { currency: 'UZS', account: '[UZS Account Number]', opened: 'Opened: [date]' },
            { currency: 'USD', account: '[USD Account Number]', opened: 'Opened: [date]' },
          ],
        },
      },
      home: {
        heroTitle1: 'Соберите свой',
        heroTitle2: 'Компьютер мечты',
        heroSubtitle: 'Премиальные комплектующие для энтузиастов и профессионалов',
        shopNow: 'Купить сейчас', learnMore: 'Узнать больше',
        bestSellers: 'Хиты продаж', bestSellersDesc: 'Самые популярные товары',
        featured: 'Рекомендованные товары', featuredDesc: 'Подборка премиальных компонентов',
        whyChoose: 'Почему выбирают нас?',
        whyChooseDesc: 'Ваш надежный партнер по премиальным комплектующим для ПК',
        whatCustomersSay: 'Отзывы клиентов',
        reviewsDesc: 'Нам доверяют тысячи энтузиастов по всему миру',
        readyToBuild: 'Готовы собирать?', browseAll: 'Смотреть все товары',
        verifiedPurchase: 'Подтвержденная покупка',
        advantages: {
          authenticTitle: 'Оригинальные товары',
          authenticDesc: 'Все товары с гарантией производителя и подтверждением подлинности',
          fastTitle: 'Быстрая доставка',
          fastDesc: 'Бесплатная экспресс‑доставка при заказе от $500. Доставка по всему миру',
          supportTitle: 'Экспертная поддержка',
          supportDesc: 'Круглосуточная техническая поддержка от экспертов по сборке ПК',
          pricesTitle: 'Лучшие цены',
          pricesDesc: 'Гарантия лучшей цены и эксклюзивные скидки для участников',
        },
      },
      about: {
        heroTitlePrefix: 'О компании',
        heroTagline: 'Ваш надежный партнер в создании высокопроизводительных вычислительных систем с 2009 года',
        stats: {
          happyCustomers: 'Довольные клиенты',
          yearsInBusiness: 'Лет на рынке',
          countriesServed: 'Страны присутствия',
          productsShipped: 'Доставленные товары',
        },
        storyTitle: 'Наша история',
        storyP1: 'Мы начали как команда энтузиастов, одержимых качеством сборки и производительностью. Сегодня мы помогаем тысячам клиентов по всему миру собирать надежные и быстрые системы.',
        storyP2: 'Наш подход прост: проверенные компоненты, честные рекомендации и сервис, которому можно доверять.',
        storyP3: 'Мы продолжаем развиваться, сохраняя фокус на качестве, инновациях и поддержке клиентов.',
        missionTitle: 'Наша миссия',
        missionBody: 'Делать высокую производительность доступной всем — через продуманный ассортимент, прозрачные цены и поддержку на каждом этапе.',
        visionTitle: 'Наше видение',
        visionBody: 'Стать эталоном доверия и сервиса в мире компьютерных компонентов для энтузиастов и профессионалов.',
        valuesTitle: 'Наши ценности',
        values: {
          quality: { title: 'Качество', desc: 'Мы отбираем и тестируем компоненты, чтобы вы получали стабильность и надежность.' },
          innovation: { title: 'Инновации', desc: 'Отслеживаем новинки и помогаем выбрать оптимальные решения под ваши задачи.' },
          customer: { title: 'Ориентация на клиента', desc: 'Поддержка 24/7, понятные консультации и помощь после покупки.' },
        },
      },
      products: { title: 'Товары', search: 'Поиск…', allCategories: 'Все категории', brand: 'Бренд', ordering: 'Сортировка', newest: 'Сначала новые', priceAsc: 'Цена ↑', priceDesc: 'Цена ↓', nameAsc: 'Имя A–Z', nameDesc: 'Имя Z–A', noResults: 'Ничего не найдено', loading: 'Загрузка…', page: 'Страница' },
      news: {
        title: 'Последние новости',
        subtitle: 'Будьте в курсе последних новостей о ПК‑железе и технологиях',
        readMore: 'Читать далее',
        loading: 'Загрузка…',
        backToNews: 'Назад к новостям',
        goBack: 'Назад',
        notFound: 'Новость не найдена.',
      },
      contactPage: {
        title: 'Свяжитесь с нами', subtitle: 'Напишите нашей команде — мы всегда готовы помочь!',
        labels: { name: 'Имя', email: 'Email', subject: 'Тема', message: 'Сообщение' },
        placeholders: { name: 'Ваше имя', email: 'ваш@email.com', subject: 'Чем мы можем помочь?', message: 'Ваше сообщение…' },
        required: 'обязательно',
        sending: 'Отправка…', send: 'Отправить сообщение',
        toastOkTitle: 'Сообщение отправлено!', toastOkDesc: 'Мы свяжемся с вами в ближайшее время.',
        toastErrTitle: 'Не удалось отправить', toastErrDesc: 'Попробуйте позже.',
        info: { address: 'Адрес', phone: 'Телефон', email: 'Email', hours: 'Часы работы', map: 'Карта' },
        zod: {
          nameReq: 'Имя обязательно', emailInvalid: 'Некорректный email', subjectReq: 'Тема обязательна', messageMin: 'Сообщение должно быть не короче 10 символов',
        },
      },
      cartPage: {
        emptyTitle: 'Ваша корзина пуста', emptyDesc: 'Начните покупки, чтобы добавить товары в корзину', browseProducts: 'Смотреть товары',
        title: 'Корзина', summary: 'Итог заказа', subtotal: 'Подытог', shipping: 'Доставка', free: 'Бесплатно', total: 'Итого',
        proceedCheckout: 'Перейти к оформлению', continueShopping: 'Продолжить покупки', each: 'за штуку',
      },
      checkoutPage: {
        title: 'Оформление заказа', shippingInfo: 'Данные для доставки',
        labels: { firstName: 'Имя', lastName: 'Фамилия', email: 'Email', phone: 'Телефон', address: 'Улица и дом', city: 'Город', zipCode: 'Индекс', country: 'Страна' },
        placing: 'Оформляем…', place: 'Оформить заказ',
        summary: 'Итог заказа', subtotal: 'Подытог', shipping: 'Доставка', free: 'Бесплатно', total: 'Итого',
        toastOkTitle: 'Заказ оформлен!', toastOkDesc: 'Скоро вы получите подтверждение по email.', toastErrTitle: 'Не удалось оформить заказ', toastErrDesc: 'Попробуйте позже.',
        zod: {
          firstName: 'Имя обязательно', lastName: 'Фамилия обязательна', email: 'Некорректный email', phone: 'Телефон должен содержать минимум 10 символов', address: 'Адрес обязателен', city: 'Город обязателен', zipCode: 'Индекс обязателен', country: 'Страна обязательна',
        },
      },
      orderComplete: {
        confirmed: 'Заказ подтвержден!', thankYou: 'Спасибо за покупку! Мы получили ваш заказ.',
        orderNumber: 'Номер заказа', orderDate: 'Дата заказа',
        emailTitle: 'Подтверждение по email', emailDesc: 'Мы отправили письмо с деталями вашего заказа.',
        deliveryTitle: 'Ориентировочная доставка', deliveryDesc: 'Отправка в течение 1–2 рабочих дней. Доставка 3–5 рабочих дней.',
        nextTitle: 'Что дальше?', next1: 'Вы получите письмо‑подтверждение с деталями заказа', next2: 'Мы пришлем уведомление об отправке с трек‑номером', next3: 'Заказ прибудет в течение 3–5 рабочих дней',
        continue: 'Продолжить покупки', backHome: 'На главную',
      },
      notFound: {
        title: 'Страница не найдена', desc: 'Страница не существует или была перемещена.', backHome: 'На главную', browse: 'Смотреть товары',
      },
      publicOfferPage: { title: 'Публичная оферта', terms: 'Условия и положения', lastUpdated: 'Последнее обновление', fallbackNote: 'Не удалось загрузить с сервера. Показана локальная копия.' },
      productDetail: {
        loading: 'Загрузка товара…', overview: 'Обзор', readMore: 'Читать далее', showLess: 'Свернуть', specifications: 'Характеристики', addToCart: 'Добавить в корзину',
        reviews: 'Отзывы', loadingReviews: 'Загрузка отзывов…', noReviews: 'Отзывов пока нет.', seeAll: 'Смотреть все отзывы', showLessReviews: 'Свернуть', loadingDots: 'Загрузка…',
        writeReview: 'Написать отзыв', pleaseLogin: 'Пожалуйста, войдите, чтобы оставить отзыв.', goToLogin: 'Войти', ratingPlaceholder: 'Оценка (1–5)', yourReview: 'Ваш отзыв', submitReview: 'Отправить отзыв', submitting: 'Отправка…', similar: 'Похожие товары', ratingLabel: 'Оценка',
      },
      paymentNotice: {
        title: 'Внесение авансового платежа',
        subtitle: 'Введите произвольную сумму и перейдите к оформлению заказа.',
        invalidAmount: 'Введите корректную сумму больше 0',
      },
      footer: {
        brandTagline: 'Ваш надежный источник премиальных комплектующих для ПК. Качество, экспертиза, честные цены.',
        quickLinks: 'Быстрые ссылки',
        categories: 'Категории',
        contactUs: 'Контакты',
        links: {
          allProducts: 'Все товары',
          aboutUs: 'О нас',
          newsUpdates: 'Новости и обновления',
          publicOffer: 'Публичная оферта',
        },
        categoriesList: {
          cpu: 'Процессоры (CPU)',
          gpu: 'Видеокарты (GPU)',
          monoblock: 'СЖО (водяное охлаждение)',
          monitor: 'Мониторы',
        },
        copyright: 'Все права защищены.',
      },
      common: { language: 'Язык', ru: 'Рус', en: 'Анг', uz: 'Узб' },
      magazine: {
        soon: 'Скоро будет доступно',
        backHome: 'На главную',
      },
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', products: 'Products', publicOffer: 'Public Offer', news: 'News', contact: 'Contact', cart: 'Cart' },
      publicOffer: {
        title: 'Public Offer Agreement',
        subtitle: 'A concise, reusable agreement for any online platform.',
        labels: {
          companyName: 'Company Name', tin: 'TIN', address: 'Registered Address', tel: 'Tel', whatsapp: 'WhatsApp', email: 'Email', bankName: 'Bank Name', mfo: 'MFO', swift: 'SWIFT',
        },
        sections: {
          introduction: {
            title: '1. Introduction',
            body: 'This document is a public offer. By using the website and/or placing an order, you accept this offer and enter into a legally binding agreement with the Company.',
          },
          services: {
            title: '2. Services',
            body: 'The website provides online services and/or access to goods, including browsing information, placing orders, making payments, and contacting support.',
            list: [
              'Access to website content and features',
              'Order placement and tracking',
              'Communication via contact forms',
            ],
          },
          userObligations: {
            title: '3. User Obligations',
            body: 'You agree to use the service responsibly and comply with applicable laws.',
            list: [
              'Provide accurate and up-to-date information',
              'Do not disrupt website security or functionality',
              'Do not use the service for illegal activities',
            ],
          },
          companyRights: {
            title: '4. Company Rights',
            body: 'The Company may modify these terms, update features, and suspend access if the rules are violated.',
            list: [
              'Change terms without prior notice',
              'Temporarily or permanently suspend accounts for violations',
              'Moderate or remove content that breaches the rules',
            ],
          },
          payments: {
            title: '5. Payments',
            body: 'Where applicable: all payments are final and non-refundable, except as required by law.',
          },
          liability: {
            title: '6. Liability Disclaimer',
            body: 'The Company is not responsible for misuse of the service by users, third‑party outages, force majeure, or other external factors beyond its control.',
          },
          governingLaw: {
            title: '7. Governing Law',
            body: 'This agreement is governed by the applicable laws of the relevant jurisdiction. Disputes shall be resolved by the competent court at the Company’s registered location, unless otherwise required by law.',
          },
          contact: {
            title: '8. Contact Information',
            body: 'Use the contact details and company information below.',
          },
        },
        company: {
          companyName: '"PREMIUM GOLD ONLINE TRADING" MCHJ',
          tin: '310329897',
          address: 'Farg‘ona viloyati, Marg‘ilon shahri, Uzun Xovuz MFY, Eshon Said ko‘chasi, 6-uy',
          tel: '+998-99-866-77-99',
          whatsapp: '+998-98-307-21-01',
          email: 'uzcomp@inbox.eu',
          bankName: '[Your Bank Name]',
          mfo: '[Bank MFO]',
          swift: '[Bank SWIFT]',
        },
        bank: {
          title: 'Bank Accounts',
          columns: { currency: 'Currency', account: 'Account Number', opened: 'Opened' },
          rows: [
            { currency: 'UZS', account: '[UZS Account Number]', opened: 'Opened: [date]' },
            { currency: 'USD', account: '[USD Account Number]', opened: 'Opened: [date]' },
          ],
        },
      },
      home: {
        heroTitle1: 'Build Your',
        heroTitle2: 'Dream PC',
        heroSubtitle: 'Premium components for enthusiasts and professionals',
        shopNow: 'Shop Now', learnMore: 'Learn More',
        bestSellers: 'Best Sellers', bestSellersDesc: 'Most popular products',
        featured: 'Featured Products', featuredDesc: 'Hand-picked premium components',
        whyChoose: 'Why Choose Us?',
        whyChooseDesc: 'Your trusted partner for premium PC components',
        whatCustomersSay: 'What Our Customers Say',
        reviewsDesc: 'Trusted by thousands of PC enthusiasts worldwide',
        readyToBuild: 'Ready to Build?', browseAll: 'Browse All Products',
        verifiedPurchase: 'Verified Purchase',
        advantages: {
          authenticTitle: 'Authentic Products',
          authenticDesc: 'All products come with manufacturer warranty and authenticity guarantee',
          fastTitle: 'Fast Shipping',
          fastDesc: 'Free express shipping on orders over $500. Worldwide delivery available',
          supportTitle: 'Expert Support',
          supportDesc: '24/7 technical support from PC building experts',
          pricesTitle: 'Best Prices',
          pricesDesc: 'Price match guarantee and exclusive member discounts',
        },
      },
      about: {
        heroTitlePrefix: 'About',
        heroTagline: 'Your trusted partner in building high‑performance computing systems since 2009',
        stats: {
          happyCustomers: 'Happy Customers',
          yearsInBusiness: 'Years in Business',
          countriesServed: 'Countries Served',
          productsShipped: 'Products Shipped',
        },
        storyTitle: 'Our Story',
        storyP1: 'We started as a small team obsessed with quality builds and performance. Today, we help thousands worldwide assemble reliable, fast systems.',
        storyP2: 'Our approach is simple: vetted components, honest guidance, and service you can trust.',
        storyP3: 'We keep growing while staying focused on quality, innovation, and customer support.',
        missionTitle: 'Our Mission',
        missionBody: 'Make high performance accessible to everyone — with curated parts, fair pricing, and support at every step.',
        visionTitle: 'Our Vision',
        visionBody: 'Become the benchmark for trust and service in PC components for enthusiasts and professionals.',
        valuesTitle: 'Our Values',
        values: {
          quality: { title: 'Quality', desc: 'We select and test components to deliver rock‑solid stability and reliability.' },
          innovation: { title: 'Innovation', desc: 'We track the latest tech to help you choose the best solution for your needs.' },
          customer: { title: 'Customer Focus', desc: '24/7 support, clear guidance, and after‑purchase help.' },
        },
      },
      products: { title: 'Products', search: 'Search…', allCategories: 'All categories', brand: 'Brand', ordering: 'Ordering', newest: 'Newest', priceAsc: 'Price ↑', priceDesc: 'Price ↓', nameAsc: 'Name A–Z', nameDesc: 'Name Z–A', noResults: 'No products found', loading: 'Loading…', page: 'Page' },
      news: { title: 'Latest News', subtitle: 'Stay updated with the latest in PC hardware and technology', readMore: 'Read More', loading: 'Loading…', backToNews: 'Back to News', goBack: 'Go Back', notFound: 'News not found.' },
      contactPage: {
        title: 'Contact Us', subtitle: "Get in touch with our team. We're here to help!",
        labels: { name: 'Name', email: 'Email', subject: 'Subject', message: 'Message' },
        placeholders: { name: 'Your name', email: 'your@email.com', subject: 'How can we help?', message: 'Your message here...' },
        required: 'required', sending: 'Sending…', send: 'Send Message',
        toastOkTitle: 'Message sent!', toastOkDesc: "We'll get back to you as soon as possible.", toastErrTitle: 'Failed to send message', toastErrDesc: 'Please try again later.',
        info: { address: 'Address', phone: 'Phone', email: 'Email', hours: 'Business Hours', map: 'Map View' },
        zod: {
          nameReq: 'Name is required', emailInvalid: 'Invalid email address', subjectReq: 'Subject is required', messageMin: 'Message must be at least 10 characters',
        },
      },
      cartPage: {
        emptyTitle: 'Your cart is empty', emptyDesc: 'Start shopping to add items to your cart', browseProducts: 'Browse Products',
        title: 'Shopping Cart', summary: 'Order Summary', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', total: 'Total',
        proceedCheckout: 'Proceed to Checkout', continueShopping: 'Continue Shopping', each: 'each',
      },
      checkoutPage: {
        title: 'Checkout', shippingInfo: 'Shipping Information',
        labels: { firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', address: 'Street Address', city: 'City', zipCode: 'ZIP Code', country: 'Country' },
        placing: 'Placing order…', place: 'Place Order',
        summary: 'Order Summary', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', total: 'Total',
        toastOkTitle: 'Order placed successfully!', toastOkDesc: 'You will receive a confirmation email shortly.', toastErrTitle: 'Failed to place order', toastErrDesc: 'Please try again later.',
        zod: {
          firstName: 'First name is required', lastName: 'Last name is required', email: 'Invalid email address', phone: 'Phone number must be at least 10 digits', address: 'Address is required', city: 'City is required', zipCode: 'ZIP code is required', country: 'Country is required',
        },
      },
      orderComplete: {
        confirmed: 'Order Confirmed!', thankYou: 'Thank you for your purchase. Your order has been received.',
        orderNumber: 'Order Number', orderDate: 'Order Date',
        emailTitle: 'Confirmation Email', emailDesc: 'A confirmation email has been sent to your email address with order details.',
        deliveryTitle: 'Estimated Delivery', deliveryDesc: 'Your order will be shipped within 1-2 business days. Estimated delivery in 3-5 business days.',
        nextTitle: "What's Next?", next1: "You'll receive an email confirmation with your order details", next2: "We'll send you a shipping notification with tracking information", next3: 'Your order will arrive within 3-5 business days',
        continue: 'Continue Shopping', backHome: 'Return to Home',
      },
      notFound: { title: 'Page Not Found', desc: "The page you're looking for doesn't exist or has been moved.", backHome: 'Back to Home', browse: 'Browse Products' },
      publicOfferPage: { title: 'Public Offer', terms: 'Terms and Conditions', lastUpdated: 'Last updated', fallbackNote: "Couldn’t load server content. Showing local copy." },
      productDetail: {
        loading: 'Loading product…', overview: 'Overview', readMore: 'Read more', showLess: 'Show less', specifications: 'Specifications', addToCart: 'Add to Cart',
        reviews: 'Reviews', loadingReviews: 'Loading reviews…', noReviews: 'No reviews yet.', seeAll: 'See all reviews', showLessReviews: 'Show less', loadingDots: 'Loading…',
        writeReview: 'Write a review', pleaseLogin: 'Please log in to write a review.', goToLogin: 'Go to Login', ratingPlaceholder: 'Rating (1-5)', yourReview: 'Your review', submitReview: 'Submit Review', submitting: 'Submitting…', similar: 'Similar products', ratingLabel: 'Rating',
      },
      paymentNotice: {
        title: 'Making an advance payment',
        subtitle: 'Enter a custom amount and proceed to checkout.',
        invalidAmount: 'Please enter a valid amount greater than 0',
      },
      footer: {
        brandTagline: 'Your trusted source for premium PC components. Quality products, expert service, competitive prices.',
        quickLinks: 'Quick Links',
        categories: 'Categories',
        contactUs: 'Contact Us',
        links: {
          allProducts: 'All Products',
          aboutUs: 'About Us',
          newsUpdates: 'News & Updates',
          publicOffer: 'Public Offer',
        },
        categoriesList: {
          cpu: 'Processors (CPUs)',
          gpu: 'Graphics Cards (GPUs)',
          monoblock: 'Water Cooling',
          monitor: 'Monitors',
        },
        copyright: 'All rights reserved.',
      },
      common: { language: 'Language', ru: 'RU', en: 'EN', uz: 'UZ' },
      magazine: {
        soon: 'Soon will be available',
        backHome: 'Back Home',
      },
    },
  },
  uz: {
    translation: {
      nav: { home: 'Bosh sahifa', about: 'Haqimizda', products: 'Mahsulotlar', publicOffer: 'Ommaviy oferta', news: 'Yangiliklar', contact: 'Aloqa', cart: 'Savat' },
      publicOffer: {
        title: 'Ommaviy oferta shartnomasi',
        subtitle: 'Har qanday onlayn platformaga mos, ixcham va tushunarli hujjat.',
        labels: {
          companyName: 'Kompaniya nomi', tin: 'STIR', address: 'Yuridik manzil', tel: 'Tel', whatsapp: 'WhatsApp', email: 'Email', bankName: 'Bank nomi', mfo: 'MFO', swift: 'SWIFT',
        },
        sections: {
          introduction: {
            title: '1. Kirish',
            body: 'Ushbu hujjat ommaviy ofertadir. Saytdan foydalanish va/yoki buyurtma berish orqali siz ofertani qabul qilasiz va Kompaniya bilan huquqiy kuchga ega shartnoma tuzasiz.',
          },
          services: {
            title: '2. Xizmatlar',
            body: 'Veb-sayt onlayn xizmatlar va/yoki tovarlarga kirish imkonini beradi: ma’lumotlarni ko‘rish, buyurtma berish, to‘lov qilish va qo‘llab-quvvatlash bilan bog‘lanish.',
            list: [
              'Sayt kontenti va funksiyalariga kirish',
              'Buyurtmalarni rasmiylashtirish va kuzatish',
              'Aloqa shakllari orqali yozishmalar',
            ],
          },
          userObligations: {
            title: '3. Foydalanuvchi majburiyatlari',
            body: 'Siz xizmatdan mas’uliyat bilan foydalanishga va amaldagi qonunlarga rioya qilishga rozilik bildirasiz.',
            list: [
              'Aniq va dolzarb ma’lumotlarni taqdim etish',
              'Sayt xavfsizligi va ishlashiga zarar yetkazmaslik',
              'Xizmatni noqonuniy faoliyat uchun ishlatmaslik',
            ],
          },
          companyRights: {
            title: '4. Kompaniyaning huquqlari',
            body: 'Kompaniya ushbu shartlarni o‘zgartirish, funksiyalarni yangilash va qoidalarga rioya qilinmagan taqdirda kirishni to‘xtatish huquqiga ega.',
            list: [
              'Oldindan ogohlantirmasdan shartlarni o‘zgartirish',
              'Qoidabuzarlik uchun akkauntni vaqtincha yoki doimiy bloklash',
              'Qoidalarga zid kontentni moderatsiya qilish yoki o‘chirish',
            ],
          },
          payments: {
            title: '5. To‘lovlar',
            body: 'Agar tegishli bo‘lsa: barcha to‘lovlar yakuniy va qaytarilmaydi (qonunda ko‘rsatilgan hollar mustasno).',
          },
          liability: {
            title: '6. Mas’uliyatni cheklash',
            body: 'Kompaniya xizmatdan noto‘g‘ri foydalanish, uchinchi tomon nosozliklari, fors-major va uning nazoratidan tashqaridagi omillar uchun javobgar emas.',
          },
          governingLaw: {
            title: '7. Amaldagi qonunchilik',
            body: 'Ushbu kelishuv tegishli yurisdiksiya qonunlariga muvofiq tartibga solinadi. Nizolar Kompaniya ro‘yxatdan o‘tgan manzil bo‘yicha vakolatli sudda ko‘rib chiqiladi, qonunda boshqacha belgilangan bo‘lmasa.',
          },
          contact: {
            title: '8. Aloqa ma’lumotlari',
            body: 'Quyidagi aloqa ma’lumotlari va kompaniya rekvizitlaridan foydalaning.',
          },
        },
        company: {
          companyName: '"PREMIUM GOLD ONLINE TRADING" MCHJ',
          tin: '310329897',
          address: 'Farg‘ona viloyati, Marg‘ilon shahri, Uzun Xovuz MFY, Eshon Said ko‘chasi, 6-uy',
          tel: '+998-99-866-77-99',
          whatsapp: '+998-98-307-21-01',
          email: 'uzcomp@inbox.eu',
          bankName: '[Your Bank Name]',
          mfo: '[Bank MFO]',
          swift: '[Bank SWIFT]',
        },
        bank: {
          title: 'Bank hisoblari',
          columns: { currency: 'Valyuta', account: 'Hisob raqami', opened: 'Ochilgan sana' },
          rows: [
            { currency: 'UZS', account: '[UZS Account Number]', opened: 'Opened: [date]' },
            { currency: 'USD', account: '[USD Account Number]', opened: 'Opened: [date]' },
          ],
        },
      },
      home: {
        heroTitle1: 'Orzuingizdagi',
        heroTitle2: 'Kompyuterni yarating',
        heroSubtitle: 'Muxlislar va mutaxassislar uchun premium qismlar',
        shopNow: 'Sotib olish', learnMore: 'Batafsil',
        bestSellers: 'Eng ko‘p sotilganlar', bestSellersDesc: 'Eng mashhur mahsulotlar',
        featured: 'Tavsiya etilgan', featuredDesc: 'Tanlab olingan premium qismlar',
        whyChoose: 'Nega bizni tanlaysiz?',
        whyChooseDesc: 'Premium PC qismlari bo‘yicha ishonchli hamkoringiz',
        whatCustomersSay: 'Mijozlar fikri',
        reviewsDesc: 'Dunyo bo‘ylab minglab entuziastlar ishonchi',
        readyToBuild: 'Boshlashga tayyormisiz?', browseAll: 'Barcha mahsulotlar',
        verifiedPurchase: 'Tasdiqlangan xarid',
        advantages: {
          authenticTitle: 'Original mahsulotlar',
          authenticDesc: 'Barcha mahsulotlar ishlab chiqaruvchi kafolati va haqiqiyligi bilan',
          fastTitle: 'Tez yetkazib berish',
          fastDesc: '$500 dan yuqori buyurtmalarga bepul ekspress yetkazib berish. Dunyo bo‘ylab yetkazib berish',
          supportTitle: 'Ekspert yordam',
          supportDesc: '24/7 PC yig‘ish bo‘yicha ekspertlarning texnik yordami',
          pricesTitle: 'Eng yaxshi narxlar',
          pricesDesc: 'Eng yaxshi narx kafolati va ishtirokchilar uchun eksklyuziv chegirmalar',
        },
      },
      about: {
        heroTitlePrefix: 'Haqimizda',
        heroTagline: '2009 yildan beri yuqori unumli kompyuter tizimlarini yaratishda ishonchli hamkoringiz',
        stats: {
          happyCustomers: 'Baxtli mijozlar',
          yearsInBusiness: 'Faoliyat yillari',
          countriesServed: 'Xizmat ko‘rsatilgan davlatlar',
          productsShipped: 'Yetkazilgan mahsulotlar',
        },
        storyTitle: 'Bizning hikoyamiz',
        storyP1: 'Biz sifatli yig‘ish va unumdorlikka oshufta kichik jamoa sifatida yo‘l boshladik. Bugun butun dunyoda minglab mijozlarga ishonchli va tezkor tizimlar yaratishda yordam beramiz.',
        storyP2: 'Bizning yondashuv oddiy: sinovdan o‘tgan qismlar, halol maslahat va ishonchli xizmat.',
        storyP3: 'Biz sifat, innovatsiya va mijozlarni qo‘llab‑quvvatlashga e’tibor qaratgan holda o‘sishda davom etamiz.',
        missionTitle: 'Bizning missiyamiz',
        missionBody: 'Har kim uchun yuqori unumdorlikni ochiq qilish — tanlab olingan qismlar, adolatli narx va har qadamda yordam bilan.',
        visionTitle: 'Bizning qarashimiz',
        visionBody: 'Enthusiast va mutaxassislar uchun kompyuter qismlarida ishonch va xizmat mezoniga aylanish.',
        valuesTitle: 'Qiymatlarimiz',
        values: {
          quality: { title: 'Sifat', desc: 'Barqarorlik va ishonchlilik uchun qismlarni tanlaymiz va sinovdan o‘tkazamiz.' },
          innovation: { title: 'Innovatsiya', desc: 'Eng so‘nggi texnologiyalarni kuzatamiz va ehtiyojingizga eng mos yechimni tavsiya qilamiz.' },
          customer: { title: 'Mijozga yo‘naltirilganlik', desc: '24/7 yordam, tushunarli maslahat va xariddan keyingi qo‘llab‑quvvatlash.' },
        },
      },
      products: { title: 'Mahsulotlar', search: 'Qidirish…', allCategories: 'Barcha toifalar', brand: 'Brend', ordering: 'Saralash', newest: 'Eng yangi', priceAsc: 'Narx ↑', priceDesc: 'Narx ↓', nameAsc: 'Nom A–Z', nameDesc: 'Nom Z–A', noResults: 'Mahsulot topilmadi', loading: 'Yuklanmoqda…', page: 'Sahifa' },
      news: { title: 'So‘nggi yangiliklar', subtitle: 'Kompyuter texnologiyalaridagi so‘nggi yangiliklardan xabardor bo‘ling', readMore: 'Batafsil', loading: 'Yuklanmoqda…', backToNews: 'Yangiliklarga qaytish', goBack: 'Orqaga', notFound: 'Yangilik topilmadi.' },
      contactPage: {
        title: 'Biz bilan bog‘laning', subtitle: 'Jamoamiz bilan bog‘laning — yordam berishga tayyormiz!',
        labels: { name: 'Ism', email: 'Email', subject: 'Mavzu', message: 'Xabar' },
        placeholders: { name: 'Ismingiz', email: 'your@email.com', subject: 'Qanday yordam bera olamiz?', message: 'Xabaringiz…' },
        required: 'majburiy', sending: 'Yuborilmoqda…', send: 'Xabarni yuborish',
        toastOkTitle: 'Xabar yuborildi!', toastOkDesc: 'Tez orada siz bilan bog‘lanamiz.', toastErrTitle: 'Yuborib bo‘lmadi', toastErrDesc: 'Keyinroq urinib ko‘ring.',
        info: { address: 'Manzil', phone: 'Telefon', email: 'Email', hours: 'Ish vaqti', map: 'Xarita' },
        zod: { nameReq: 'Ism majburiy', emailInvalid: 'Email noto‘g‘ri', subjectReq: 'Mavzu majburiy', messageMin: 'Xabar kamida 10 ta belgidan iborat bo‘lishi kerak' },
      },
      cartPage: {
        emptyTitle: 'Savat bo‘sh', emptyDesc: 'Mahsulotlarni savatga qo‘shish uchun xaridni boshlang', browseProducts: 'Mahsulotlarni ko‘rish',
        title: 'Savat', summary: 'Buyurtma xulosasi', subtotal: 'Oraliq jami', shipping: 'Yetkazib berish', free: 'Bepul', total: 'Jami',
        proceedCheckout: 'Buyurtmani rasmiylashtirish', continueShopping: 'Xaridni davom ettirish', each: 'donasi',
      },
      checkoutPage: {
        title: 'Buyurtma', shippingInfo: 'Yetkazib berish ma’lumotlari',
        labels: { firstName: 'Ism', lastName: 'Familiya', email: 'Email', phone: 'Telefon', address: 'Manzil', city: 'Shahar', zipCode: 'Pochta indeksi', country: 'Mamlakat' },
        placing: 'Buyurtma rasmiylashtirilmoqda…', place: 'Buyurtmani tasdiqlash',
        summary: 'Buyurtma xulosasi', subtotal: 'Oraliq jami', shipping: 'Yetkazib berish', free: 'Bepul', total: 'Jami',
        toastOkTitle: 'Buyurtma muvaffaqiyatli!', toastOkDesc: 'Tez orada tasdiqlovchi xat olasiz.', toastErrTitle: 'Buyurtma berib bo‘lmadi', toastErrDesc: 'Keyinroq urinib ko‘ring.',
        zod: {
          firstName: 'Ism majburiy', lastName: 'Familiya majburiy', email: 'Email noto‘g‘ri', phone: 'Telefon raqami kamida 10 ta belgidan iborat bo‘lishi kerak', address: 'Manzil majburiy', city: 'Shahar majburiy', zipCode: 'Indeks majburiy', country: 'Mamlakat majburiy',
        },
      },
      orderComplete: {
        confirmed: 'Buyurtma tasdiqlandi!', thankYou: 'Xaridingiz uchun rahmat. Buyurtmangiz qabul qilindi.',
        orderNumber: 'Buyurtma raqami', orderDate: 'Buyurtma sanasi',
        emailTitle: 'Tasdiqlovchi xat', emailDesc: 'Buyurtma tafsilotlari bilan emailingizga xabar yuborildi.',
        deliveryTitle: 'Taxminiy yetkazib berish', deliveryDesc: '1–2 ish kunida jo‘natamiz. Yetkazib berish 3–5 ish kunida.',
        nextTitle: 'Keyingi qadamlar', next1: 'Buyurtma tafsilotlari bilan xat olasiz', next2: 'Jo‘natish va trek raqam haqida xabar yuboramiz', next3: 'Buyurtma 3–5 ish kunida yetib boradi',
        continue: 'Xaridni davom ettirish', backHome: 'Bosh sahifaga qaytish',
      },
      notFound: { title: 'Sahifa topilmadi', desc: 'Qidirayotgan sahifa mavjud emas yoki ko‘chirildi.', backHome: 'Bosh sahifaga', browse: 'Mahsulotlarni ko‘rish' },
      publicOfferPage: { title: 'Ommaviy oferta', terms: 'Shartlar va qoidalar', lastUpdated: 'Oxirgi yangilanish', fallbackNote: 'Serverdan yuklab bo‘lmadi. Mahalliy nusxa ko‘rsatildi.' },
      productDetail: {
        loading: 'Mahsulot yuklanmoqda…', overview: 'Umumiy ma’lumot', readMore: 'Ko‘proq ko‘rish', showLess: 'Kamroq ko‘rish', specifications: 'Xususiyatlar', addToCart: 'Savatga qo‘shish',
        reviews: 'Sharhlar', loadingReviews: 'Sharhlar yuklanmoqda…', noReviews: 'Hozircha sharhlar yo‘q.', seeAll: 'Barcha sharhlarni ko‘rish', showLessReviews: 'Yig‘ish', loadingDots: 'Yuklanmoqda…',
        writeReview: 'Sharh yozish', pleaseLogin: 'Sharh yozish uchun tizimga kiring.', goToLogin: 'Kirish', ratingPlaceholder: 'Baholash (1–5)', yourReview: 'Sharhingiz', submitReview: 'Sharhni yuborish', submitting: 'Yuborilmoqda…', similar: 'O‘xshash mahsulotlar', ratingLabel: 'Baholash',
      },
      paymentNotice: {
        title: 'Oldindan to‘lov qilish',
        subtitle: 'Ixtiyoriy summani kiriting va to‘lovga o‘ting.',
        invalidAmount: '0 dan katta haqiqiy summani kiriting',
      },
      footer: {
        brandTagline: 'Premium PC qismlari uchun ishonchli manzilingiz. Sifat, ekspert xizmat va raqobatbardosh narxlar.',
        quickLinks: 'Tezkor havolalar',
        categories: 'Toifalar',
        contactUs: 'Aloqa',
        links: {
          allProducts: 'Barcha mahsulotlar',
          aboutUs: 'Haqimizda',
          newsUpdates: 'Yangiliklar',
          publicOffer: 'Ommaviy oferta',
        },
        categoriesList: {
          cpu: 'Protsessorlar (CPU)',
          gpu: 'Video kartalar (GPU)',
          monoblock: 'Suvli sovutish',
          monitor: 'Monitorlar',
        },
        copyright: 'Barcha huquqlar himoyalangan.',
      },
      common: { language: 'Til', ru: 'RU', en: 'EN', uz: 'UZ' },
      magazine: {
        soon: 'Tez orada mavjud bo‘ladi',
        backHome: 'Bosh sahifaga qaytish',
      },
    },
  },
} as const;

const initialLang = getApiLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

// Sync i18n language changes with API Accept-Language
i18n.on('languageChanged', (lng) => {
  setApiLanguage(lng as Lang);
});

export default i18n;
