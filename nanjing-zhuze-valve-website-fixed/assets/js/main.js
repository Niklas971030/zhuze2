document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#menu');
  if(burger){
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // Language switch (simple: toggles data-i18n elements)
  const cnBtn = document.querySelector('#lang-cn');
  const enBtn = document.querySelector('#lang-en');
  if(cnBtn && enBtn){
    cnBtn.addEventListener('click', ()=> switchLang('cn'));
    enBtn.addEventListener('click', ()=> switchLang('en'));
    const stored = localStorage.getItem('lang') || 'cn';
    switchLang(stored);
  }

  function switchLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = i18n[lang][key];
      if(text){ el.innerHTML = text; }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = i18n[lang][key];
      if(text){ el.setAttribute('placeholder', text); }
    });
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.getAttribute('data-i18n-value');
      const text = i18n[lang][key];
      if(text){ el.setAttribute('value', text); }
    });
    document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.remove('active'));
    if(lang==='cn') cnBtn.classList.add('active'); else enBtn.classList.add('active');
    localStorage.setItem('lang', lang);
  }

  // Contact form (front-end only)
  const form = document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const required = ['company','name','email','message'];
      const errors = [];
      required.forEach(k=>{ if(!(fd.get(k)||'').trim()) errors.push(k); });
      const email = (fd.get('email')||'').trim();
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ errors.push('email'); }
      const box = document.querySelector('#form-status');
      if(errors.length){
        box.className='error';
        box.textContent='请完整填写必填信息 / Please complete required fields.';
        return;
      }
      box.className='success';
      box.textContent='已提交（演示环境）/ Submitted (demo only).';
      form.reset();
    });
  }
});

// Minimal i18n dictionary
const i18n = {
  cn: {
    tagline: '工业阀门与管路系统一站式供应商',
    hero_cta_primary: '查看产品',
    hero_cta_secondary: '获取报价',
    kpi_1: '年交付能力',
    kpi_2: '产品品类',
    kpi_3: '服务行业',
    kpi_4: '准时交付率',
    about_lead: '依托常州总部制造体系，南京竹箦阀业专注华东市场的快速响应与本地化服务，为水系统、暖通、化工、能源等行业提供高可靠性阀门与管路部件。',
    prod_lead: '覆盖闸阀、截止阀、球阀、蝶阀、止回阀、金属软管、波纹补偿器等核心系列，支持非标定制与OEM。',
    contact_lead: '欢迎提供项目清单或图纸，我们将在 24 小时内反馈方案与报价。',
    form_company: '公司名称（必填）',
    form_name: '联系人（必填）',
    form_email: '邮箱（必填）',
    form_phone: '电话',
    form_message: '需求描述（规格、数量、交期等）（必填）',
    form_submit: '提交',
    table_header: '热门产品规格示例（可定制）'
  },
  en: {
    tagline: 'One-stop supplier for industrial valves & piping systems',
    hero_cta_primary: 'View Products',
    hero_cta_secondary: 'Get a Quote',
    kpi_1: 'Annual output capacity',
    kpi_2: 'Product families',
    kpi_3: 'Industries served',
    kpi_4: 'On-time delivery',
    about_lead: 'Leveraging the Changzhou HQ manufacturing system, Nanjing Zhuze focuses on rapid response and localized services across East China, supplying reliable valves and piping components for water, HVAC, chemical and energy sectors.',
    prod_lead: 'Gate/Globe/Ball/Butterfly/Check valves, metal hoses and expansion joints. OEM & custom available.',
    contact_lead: 'Send us your BOM or drawings — a proposal and quotation will arrive within 24 hours.',
    form_company: 'Company (required)',
    form_name: 'Contact (required)',
    form_email: 'Email (required)',
    form_phone: 'Phone',
    form_message: 'Inquiry details (specs, qty, lead time) (required)',
    form_submit: 'Send',
    table_header: 'Popular spec examples (customizable)'
  }
};
