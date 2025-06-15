import React, { createContext, useState, useContext } from "react";

// Translation data
const translations = {
  en: {
    english: "English",
    arabic: "Arabic",
    egp: "Egp",
    //HOME
    discoverNef: "DISCOVER NEFERONNE",
    shopNow: "SHOP NOW",
    //MENU
    allProducts: "All Products",
    account: "Account",
    //CART
    basket: "Basket",
    proceedcheckout: "Proceed to Checkout",
    emptycart: "Your cart is currently empty.",
    //ABOUT
    aboutus: "About Us",
    eternal: "Eternal",
    refined: "Refined",
    luxurious: "Luxurious",
    ourstory: "Our Story",
    story:
      'Neferonne is a brand born from a deep admiration for timeless luxury and enduring elegance. Our name, drawn from the ancient Egyptian word "Nefer," meaning "beautiful," reflects our commitment to crafting exquisite, high-quality pieces that celebrate true beauty — both external and within. Founded in 2025, Neferonne emerged from a simple, yet profound realization: the world was losing touch with the quiet power of old-money sophistication — where quality spoke louder than trends, and elegance was a way of life. Unable to find the heirloom-quality pieces we longed for, we built Neferonne for those who seek something more: heritage, craftsmanship, and authenticity. At Neferonne, we believe every individual deserves to feel not just adorned, but empowered. Our curated collections are designed to inspire confidence, elevate your presence, and honor your individuality. Each piece whispers a story of artistry, tradition, and lasting beauty — made for those who understand that true luxury is timeless. Join us on a journey of self-discovery, legacy, and refinement. Experience the world of Neferonne: a place where elegance endures and your unique beauty is always celebrated.',
    mission: "Mission",
    missiondesc:
      "To revive the spirit of timeless elegance by crafting high-quality, heritage-inspired pieces that empower individuality and celebrate enduring beauty.",
    vision: "Vision",
    visiondesc:
      "To be the global symbol of quiet luxury, where every piece tells a story of authenticity, refinement, and legacy.",
    corevalues: "Core Values",
    value1: "Timelessness",
    value1desc:
      "We create pieces meant to be cherished for a lifetime, not just a season",
    value2: "Heritage Craftsmanship",
    value2desc:
      "We honor traditional techniques, blending them with modern refinement",
    value3: "Understated Luxury",
    value3desc:
      "Our creations speak softly but leave a lasting, powerful impression",
    value4: "Individuality",
    value4desc:
      "We celebrate personal expression and believe true beauty is deeply individual",
    value5: "Integrity",
    value5desc:
      "We are committed to exceptional quality, authenticity, and responsible creation",
    value6: "Legacy",
    value6desc:
      "We design for today, tomorrow, and generations beyond — crafting treasures meant to endure",
    // CONTACT US
    contactus: "Contact Us",
    contactdesc:
      "If you require style advice, product information, or even assistance placing an order over the phone, see below for all the ways you can get in touch.",
    getintouch: "Get in Touch",
    followus: "Follow Us & Contact via",
    emailus: "Contact via Email",
    //LOGIN - SIGNUP - RESET
    haveacc: "ALREADY HAVE AN ONLINE ACCOUNT?",
    newCustomers: "NEW CUSTOMERS WELCOME!",
    createAcc: "CREATE YOUR ACCOUNT",
    SIGNIN: "SIGN IN",
    forgotpass: "Forgot your Password?",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    resetpass: "RESET YOUR PASSWORD",
    resetpassdesc: "We will send you an email to reset your password.",
    submit: "SUBMIT",
    cancel: "Cancel",
    createacc: "CREATE ACCOUNT",
    confirmation:
      "By clicking on “Create my account,” you confirm that you have read Neferonne’s [Privacy Policy] and consent to the processing of your personal data by Neferonne for the purposes of account creation, customer relationship management, and in accordance with the terms outlined in the Privacy Policy available in the footer.",
    alreadyacc: "Already have an account?",
    signIn: "Sign in",
    //FOOTER
    clientservices: "Client Services",
    aboutNef: "About Neferonne",
    contact: "Contact Us",
    delivery: "Delivery & Returns",
    legals: "Legals",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    changeLanguage: "Change Language",
    followus: "Follow us",
    //productView
    addtocart: "Add to cart",
    relatedname: "Related Products",
    recommendedname: "Recommended for you",
    //LEGALS
    effectiveDate: "Effective Date",
    returnPolicy: "Return Policy",
    legalTerms: "LEGAL TERMS",
    termsDesc: "GENERAL TERMS AND CONDITIONS OF SALE AND WEBSITE USE",
    termsPolicy:
      "Welcome to Neferonne. These Terms govern the sale of our products and the use of our website. By purchasing products or using our website, you agree to these Terms. Please read them carefully.",
    generalInfo: "GENERAL INFORMATION",
    theWebsite: "The website",
    generalInfoDesc:
      "(the 'Website') is operated by Neferonne ('we', 'us', 'our'), a company organized under the laws of the Arab Republic of Egypt.",
    websiteTerms: "WEBSITE TERMS OF USE",
    websiteTermsDesc:
      "You agree to use this Website lawfully and respectfully. Unauthorized use (such as hacking, copying, reverse engineering) is strictly prohibited.",
    yourContent: "YOUR CONTENT",
    yourContent1:
      "Any content you submit (such as reviews or social media tags) may be used by Neferonne for marketing purposes.",
    yourContent2:
      "You grant us a non-exclusive, royalty-free right to use such content worldwide.",
    eligibility: "ELIGIBILITY",
    eligibilityDesc:
      "Purchases on the Website are limited to individuals legally capable of entering into binding contracts under Egyptian law. You must be at least 18 years old.",
    generalTerms: "GENERAL CONDITIONS OF PURCHASE",
    generalTerms1:
      "All purchases made through the Website are subject to product availability and acceptance by Neferonne.",
    generalTerms2:
      "We reserve the right to refuse any order at our discretion.",
    placingOrder: "PLACING AN ORDER",
    placingOrder1: "Select your product(s) and add them to your shopping cart.",
    placingOrder2: "Confirm your order details.",
    placingOrder3: "Proceed to payment.",
    placingOrder4:
      "Your order is an offer to buy, not a final contract until we send an order confirmation.",
    productAvailability: "PRODUCT AVAILABILITY",
    productAvailabilityDesc:
      "Products displayed on the Website are subject to availability. We may, at any time, modify or discontinue products without prior notice.",
    orderConfirmation: "ORDER CONFIRMATION",
    orderConfirmation1:
      "After placing an order, you will receive an order confirmation email.",
    orderConfirmation2:
      "This confirms we have received your order, but it does not guarantee shipment until your payment is approved.",
    paymentMethods: "PAYMENT METHODS",
    paymentMethodDesc:
      "We accept various payment methods displayed on our checkout page. All payments are processed securely.",
    productDelivery: "PRODUCT DELIVERY",
    productDelivery1:
      "Delivery Address: You are responsible for providing accurate delivery details.",
    productDelivery2:
      "Delivery Problems: If delivery is delayed or impossible (due to incorrect address or other issues), Neferonne will contact you to resolve the situation, and more delivery related informations is in Delivery & Returns page.",
    shippingCosts: "SHIPPING COSTS",
    shippingCostsDesc:
      "Shipping costs are calculated at checkout based on your order and delivery location.",
    returns: "RETURNS",
    returnsDesc1:
      "Returns are accepted within 3 days of receipt, provided that the item is unused, in its original condition and packaging.",
    returnsDesc2: "Please refer to our ",
    returnsDesc3: " page for complete instructions.",
    intellectualProperty: "INTELLECTUAL PROPERTY",
    intellectualPropertyDesc:
      "All materials on the Website, including logos, designs, text, images, and products, are owned by or licensed to Neferonne and are protected by copyright and trademark laws.",
    intellectualPropertyDesc2:
      "You may not use or reproduce our intellectual property without our express written permission.",
    indemnification: "INDEMNIFICATION",
    indemnificationDesc:
      "You agree to indemnify and hold Neferonne harmless from any claims, damages, or losses arising from your use of the Website or violation of these Terms, or infringement of any third party’s rights",
    availabilityAccess: "AVAILABILITY AND ACCESS",
    availabilityAccessDesc:
      "We strive to maintain constant access to the Website, but do not guarantee uninterrupted service.",
    availabilityAccessDesc2:
      "We may suspend access temporarily for maintenance, updates, or security reasons.",
    disclaimer: "DISCLAIMER",
    disclaimerDesc:
      'The Website and its content are provided "as is." Neferonne disclaims any warranties, express or implied, including but not limited to merchantability, non-infringement, or fitness for a particular purpose.',
    limitationLiability: "LIMITATION OF LIABILITY",
    limitationLiabilityDesc:
      "Neferonne shall not be liable for any damages arising from use of the Website or products, including but not limited to indirect, incidental, or consequential damages.",
    limitationLiabilityDesc2:
      "In no event shall our liability exceed the amount paid for the product.",
    applicableLaw: "APPLICABLE LAW AND JURISDICTION",
    applicableLawDesc:
      "These Terms are governed by the laws of the Arab Republic of Egypt. Any disputes shall be resolved in the competent courts of Cairo.",
    contactUs: "CONTACT US",
    contactUsDesc:
      "For any questions or concerns regarding these Terms, please contact us at:",
  },
  ar: {
    english: "إنجليزي",
    arabic: "عربي",
    egp: "جنيه",
    //HOME
    discoverNef: "اكتشف NEFERONNE",
    shopNow: "تسوق الآن",
    //MENU
    allProducts: "جميع المنتجات",
    services: "الخدمات",
    account: "الحساب",
    //CART
    basket: "سلة",
    proceedcheckout: "إتمام الشراء",
    emptycart: "عربة التسوق الخاصة بك فارغة حاليًا.",
    //ABOUT
    aboutus: "من نحن",
    eternal: "خالد",
    refined: "مُصَفَّى",
    luxurious: "فاخر",
    ourstory: "قصتنا",
    story:
      'Neferonne علامة تجارية وُلدت من شغفٍ عميق بالفخامة الخالدة والأناقة الدائمة. اسمنا، المشتق من الكلمة المصرية القديمة "Nefer" والتي تعني "الجميل"، يعكس التزامنا بصناعة قطع فاخرة وعالية الجودة تحتفي بالجمال الحقيقي - الخارجي والداخلي. تأسست Neferonne عام ٢٠٢٥، انطلاقًا من إدراكٍ بسيطٍ ولكنه عميق: أن العالم بدأ يفقد صلته بالقوة الهادئة للرقيّ التقليدي - حيث الجودة أعلى صوتًا من الصيحات، والأناقة أسلوب حياة. نظرًا لعدم قدرتنا على العثور على القطع ذات الجودة التراثية التي كنا نتوق إليها، صممنا Neferonne لمن يبحثون عن المزيد: التراث، والحرفية، والأصالة. في نفرون، نؤمن بأن كل فرد يستحق أن يشعر ليس فقط بالفخامة، بل بالتمكين أيضًا. صُممت مجموعاتنا المختارة بعناية لإلهام الثقة، والارتقاء بحضوركِ، وإبراز شخصيتكِ. كل قطعة تهمس بقصة من الفن والتقاليد والجمال الدائم - صُممت لمن يدركون أن الفخامة الحقيقية خالدة. انضموا إلينا في رحلة لاكتشاف الذات، والإرث، والرقي. اكتشفوا عالم Neferonne: مكانٌ تدوم فيه الأناقة، ويُحتفى فيه بجمالكم الفريد دائمًا.',
    mission: "المهمة",
    missiondesc:
      "إحياء روح الأناقة الخالدة من خلال صياغة قطع عالية الجودة مستوحاة من التراث تعمل على تعزيز الفردية والاحتفال بالجمال الدائم.",
    vision: "الرؤية",
    visiondesc:
      "أن نكون الرمز العالمي للفخامة الهادئة، حيث تروي كل قطعة قصة من الأصالة، والرقي، والإرث.",
    corevalues: "القيم الأساسية",
    value1: "الخلود",
    value1desc: "نصنع قطعًا تُقدّر مدى الحياة، لا لموسم واحد فقط.",
    value2: "الحرفية التراثية",
    value2desc: "نحن نكرّم التقنيات التقليدية، ونمزجها مع الرقيّ العصري.",
    value3: "الفخامة الراقية",
    value3desc: "إبداعاتنا رقيقة، لكنها تترك انطباعًا قويًا ودائمًا.",
    value4: "الفردية",
    value4desc:
      "نحتفي بالتعبير الشخصي، ونؤمن بأن الجمال الحقيقي يكمن في عمق الفرد.",
    value5: "النزاهة",
    value5desc: "نحن ملتزمون بالجودة الاستثنائية، والأصالة، والإبداع المسؤول.",
    value6: "الإرث",
    value6desc: "نصمم للحاضر والمستقبل، وللأجيال القادمة - نصنع كنوزًا خالدة.",
    // CONTACT US
    contactus: "اتصل بنا",
    contactdesc:
      "إذا كنت بحاجة إلى نصيحة حول الأسلوب، أو معلومات عن المنتج، أو حتى مساعدة في تقديم طلب عبر الهاتف، انظر أدناه لجميع الطرق التي يمكنك من خلالها التواصل.",
    getintouch: "تواصل معنا",
    followus: "تابعنا و اتصل عبر",
    emailus: "اتصل عبر البريد الإلكتروني",
    //LOGIN - SIGNUP - RESET
    haveacc: "هل لديك حساب على الإنترنت بالفعل؟",
    newCustomers: "مرحبًا بكم في العملاء الجدد!",
    createAcc: "إنشاء حسابك",
    SIGNIN: "تسجيل الدخول",
    forgotpass: "نسيت كلمة المرور؟",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    phone: "رقم الهاتف",
    resetpass: "إعادة تعيين كلمة المرور",
    resetpassdesc:
      "سنرسل لك بريدًا إلكترونيًا لإعادة تعيين كلمة المرور الخاصة بك.",
    submit: "إرسال",
    cancel: "إلغاء",
    createacc: "إنشاء حساب",
    confirmation:
      " بالنقر على إنشاء حسابي، فإنك تؤكد أنك قرأت [سياسة الخصوصية] الخاصة بـ Neferonne وتوافق على معالجة بياناتك الشخصية بواسطة Neferonne لأغراض إنشاء الحساب وإدارة علاقات العملاء ووفقًا للشروط الموضحة في سياسة الخصوصية المتوفرة في التذييل.",
    alreadyacc: "هل لديك حساب بالفعل؟",
    signIn: "تسجيل الدخول",
    //FOOTER
    clientservices: "خدمات العملاء",
    aboutNef: "نبذة عن Neferonne",
    contact: "اتصل بنا",
    delivery: "التسليم والمرتجعات",
    legals: "الشرعية",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    changeLanguage: "تغيير اللغة",
    followus: "تابعنا",

    //productView
    addtocart: "أضف إلى السلة",
    relatedname: "المنتجات ذات الصلة",
    recommendedname: "موصى به لك",
    //LEGALS
    effectiveDate: "تاريخ السريان",
    legalTerms: "الشروط القانونية",
    termsDesc: "الشروط والأحكام العامة للبيع واستخدام الموقع",
    termsPolicy:
      "مرحبًا بكم في Neferonne. تحكم هذه الشروط بيع منتجاتنا واستخدام موقعنا الإلكتروني. من خلال شراء المنتجات أو استخدام موقعنا الإلكتروني، فإنك توافق على هذه الشروط. يرجى قراءتها بعناية.",
    generalInfo: "معلومات عامة",
    theWebsite: "الموقع الإلكتروني",
    generalInfoDesc:
      "(الموقع) تديره Neferonne ('نحن'، 'لنا'، 'خاصتنا')، وهي شركة منظمة بموجب قوانين جمهورية مصر العربية.",
    websiteTerms: "شروط استخدام الموقع",
    websiteTermsDesc:
      "أنت توافق على استخدام هذا الموقع الإلكتروني بشكل قانوني ومحترم. يُمنع منعًا باتًا الاستخدام غير المصرح به (مثل الاختراق والنسخ والهندسة العكسية).",
    yourContent: "محتواك",
    yourContent1:
      "يجوز لشركة Neferonne استخدام أي محتوى ترسله (مثل المراجعات أو علامات الوسائط الاجتماعية) لأغراض التسويق.",
    yourContent2:
      "تمنحنا الحق غير الحصري والخالي من حقوق الملكية لاستخدام هذا المحتوى في جميع أنحاء العالم.",
    eligibility: "الأهلية",
    eligibilityDesc:
      "تقتصر عمليات الشراء على الموقع الإلكتروني على الأفراد المؤهلين قانونًا لإبرام عقود ملزمة بموجب القانون المصري. يجب ألا يقل عمرك عن 18 عامًا.",
    generalTerms: "الشروط العامة للشراء",
    generalTerms1:
      "جميع المشتريات التي تتم من خلال الموقع الإلكتروني تخضع لتوافر المنتج وقبوله من قبل شركة Neferonne.",
    generalTerms2: "نحن نحتفظ بالحق في رفض أي طلب وفقًا لتقديرنا.",
    placingOrder: "تقديم طلب",
    placingOrder1: "حدد منتجاتك وأضفها إلى سلة التسوق الخاصة بك.",
    placingOrder2: "أكد تفاصيل طلبك.",
    placingOrder3: "تابع إلى الدفع.",
    placingOrder4:
      "يعد طلبك بمثابة عرض للشراء، وليس عقدًا نهائيًا حتى نرسل لك تأكيد الطلب.",
    productAvailability: "توافر المنتج",
    productAvailabilityDesc:
      "المنتجات المعروضة على الموقع الإلكتروني تخضع لتوافرها. يحق لنا، في أي وقت، تعديل أو إيقاف المنتجات دون إشعار مسبق.",
    orderConfirmation: "تأكيد الطلب",
    orderConfirmation1:
      "بعد تقديم الطلب، سوف تتلقى رسالة بريد إلكتروني لتأكيد الطلب.",
    orderConfirmation2:
      "يؤكد هذا أننا تلقينا طلبك، لكنه لا يضمن الشحن حتى تتم الموافقة على الدفع الخاص بك.",
    paymentMethods: "طرق الدفع",
    paymentMethodDesc:
      "نقبل طرق الدفع المختلفة المعروضة على صفحة الدفع. جميع المدفوعات تتم بأمان.",
    productDelivery: "تسليم المنتج",
    productDelivery1:
      "عنوان التسليم: أنت مسؤول عن تقديم تفاصيل التسليم الدقيقة.",
    productDelivery2:
      "مشاكل التسليم: إذا تأخر التسليم أو كان مستحيلاً (بسبب عنوان غير صحيح أو مشكلات أخرى)، فسوف تتواصل معك Neferonne لحل الموقف، والمزيد من المعلومات المتعلقة بالتسليم موجودة في صفحة التسليم والإرجاع.",
    shippingCosts: "تكاليف الشحن",
    shippingCostsDesc:
      "يتم حساب تكاليف الشحن عند الخروج بناءً على طلبك وموقع التسليم.",
    returns: "الإرجاعات",
    returnsDesc1:
      "يتم قبول الإرجاع خلال 3 أيام من تاريخ الاستلام، بشرط أن يكون المنتج غير مستخدم وفي حالته الأصلية وتغليفه.",
    returnsDesc2: "يرجى الرجوع إلى ",
    returnsDesc3: "الصفحة للحصول على التعليمات الكاملة. ",
    intellectualProperty: "الملكية الفكرية",
    intellectualPropertyDesc:
      "جميع المواد الموجودة على الموقع، بما في ذلك الشعارات والتصميمات والنصوص والصور والمنتجات، مملوكة لشركة Neferonne أو مرخصة لها وهي محمية بموجب قوانين حقوق النشر والعلامات التجارية.",
    intellectualPropertyDesc2:
      "لا يجوز لك استخدام أو إعادة إنتاج ملكيتنا الفكرية دون الحصول على إذن كتابي صريح منا.",
    indemnification: "التعويض",
    indemnificationDesc:
      "أنت توافق على تعويض Neferonne وحمايتها من أي مطالبات أو أضرار أو خسائر ناجمة عن استخدامك للموقع أو انتهاك هذه الشروط أو انتهاك حقوق أي طرف ثالث",
    availabilityAccess: "التوافر والوصول",
    availabilityAccessDesc:
      "نحن نسعى جاهدين للحفاظ على إمكانية الوصول المستمر إلى الموقع الإلكتروني، ولكننا لا نضمن الخدمة دون انقطاع.",
    availabilityAccessDesc2:
      "يجوز لنا تعليق الوصول مؤقتًا لأسباب الصيانة أو التحديثات أو الأمان.",
    disclaimer: "إخلاء المسؤولية",
    disclaimerDesc:
      'يُقدَّم الموقع الإلكتروني ومحتواه "كما هو". تُخلي نيفرون مسؤوليتها عن أي ضمانات، صريحة كانت أم ضمنية، بما في ذلك على سبيل المثال لا الحصر، قابلية التسويق، وعدم التعدي، والملاءمة لغرض معين.',
    limitationLiability: "حدود المسؤولية",
    limitationLiabilityDesc:
      "لا تتحمل شركة Neferonne مسؤولية أي أضرار ناجمة عن استخدام الموقع الإلكتروني أو المنتجات، بما في ذلك على سبيل المثال لا الحصر الأضرار غير المباشرة أو العرضية أو التبعية.",
    limitationLiabilityDesc2:
      "في أي حال من الأحوال، لن تتجاوز مسؤوليتنا المبلغ المدفوع مقابل المنتج.",
    applicableLaw: "القانون المعمول به والاختصاص القضائي",
    applicableLawDesc:
      "تخضع هذه الشروط لقوانين جمهورية مصر العربية. تُحل أي نزاعات أمام المحاكم المختصة في القاهرة.",
    contactUs: "اتصل بنا",
    contactUsDesc: "لأي أسئلة أو مخاوف بخصوص هذه الشروط، يرجى الاتصال بنا على:",
  },
};

// Create TranslationContext
const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );
  const direction = language === "ar" ? "rtl" : "ltr";

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Save to localStorage
  };

  return (
    <TranslationContext.Provider
      value={{
        t: translations[language],
        language,
        changeLanguage,
        direction,
      }}
    >
      <div dir={direction}>{children}</div>
    </TranslationContext.Provider>
  );
};

// Custom hook to access the translations and change language
export const useTranslation = () => useContext(TranslationContext);
