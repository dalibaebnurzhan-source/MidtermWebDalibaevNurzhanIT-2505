$(document.getElementById('membershipForm') ? document : window).ready(function () {

  // ==========================================
  // 1. JAVASCRIPT FUNCTIONALITY (Criterion 3)
  // 8 Object Array + DOM Manipulation + Filter/Search
  // ==========================================

  const trainers = [
  { id: 1, name: "Viktor Tsoy", category: "BJJ", exp: "3 Years Exp", desc: "Grappling & Submissions Specialist.", img: "coach1..jpg" },
  { id: 2, name: "Sergey Morozov", category: "Boxing", exp: "8 Years Exp", desc: "Head Boxing Coach & National Champion.", img: "coach2.jpeg" },
  { id: 3, name: "Nurasyl Kassymov", category: "MMA", exp: "6 Years Exp", desc: "Pro Fighter with 10-2 Record.", img: "coach3.jpeg" },
  { id: 4, name: "Alexey Smirnov", category: "CrossFit", exp: "5 Years Exp", desc: "Certified CrossFit Level 3 Trainer.", img: "coach4.jpeg" },
  { id: 5, name: "Dmitry Volkov", category: "Boxing", exp: "7 Years Exp", desc: "Specializes in Teens & Beginners.", img: "coach5.jpg" },
  { id: 6, name: "Arman Akhmetov", category: "MMA", exp: "4 Years Exp", desc: "Kids MMA & Striking Coach.", img: "coach6.jpeg" },
  { id: 7, name: "Mikhail Sokolov", category: "CrossFit", exp: "6 Years Exp", desc: "Endurance & Conditioning Expert.", img: "coach7.jpg" },
  { id: 8, name: "Sultan Bekov", category: "BJJ", exp: "9 Years Exp", desc: "Black Belt BJJ Head Instructor.", img: "coach8.jpg" },
];

  // Function to render trainers into DOM
  function renderTrainers(items) {
    const grid = $('#trainersGrid');
    grid.empty();

    if (items.length === 0) {
      $('#noResults').show();
      return;
    } else {
      $('#noResults').hide();
    }

    items.forEach(trainer => {
      const cardHTML = `
        <div class="col-md-6 col-lg-3">
          <div class="trainer-card">
            <img src="${trainer.img}" alt="${trainer.name}">
            <div class="trainer-info">
              <span class="category">${trainer.category}</span>
              <h4>${trainer.name}</h4>
              <span class="exp">${trainer.exp}</span>
              <p class="text-muted small mb-0">${trainer.desc}</p>
            </div>
          </div>
        </div>
      `;
      grid.append(cardHTML);
    });
  }

  // Initial Render
  renderTrainers(trainers);

  // Search & Filter Logic
  function filterTrainers() {
    const searchText = $('#searchInput').val().toLowerCase().trim();
    const selectedCategory = $('#categoryFilter').val();

    const filtered = trainers.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchText) || t.category.toLowerCase().includes(searchText);
      const matchesCategory = (selectedCategory === "All") || (t.category === selectedCategory);
      return matchesSearch && matchesCategory;
    });

    renderTrainers(filtered);
  }

  $('#searchInput').on('keyup input', filterTrainers);
  $('#categoryFilter').on('change', filterTrainers);

  // ==========================================
  // 2. FORMS & VALIDATION (Criterion 2)
  // Bootstrap Form + JS Real-time Validation
  // ==========================================

  const $form = $('#membershipForm');
  const $successAlert = $('#formSuccessAlert');

  // Input elements
  const $fullName = $('#fullName');
  const $email = $('#email');
  const $phone = $('#phone');
  const $program = $('#program');
  const $startDate = $('#startDate');

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[0-9]{10,14}$/;

  function validateField(input, isConditionMet) {
    if (isConditionMet) {
      input.removeClass('is-invalid').addClass('is-valid');
      return true;
    } else {
      input.removeClass('is-valid').addClass('is-invalid');
      return false;
    }
  }

  // Real-time Validation Events
  $fullName.on('input', function () {
    validateField($(this), $(this).val().trim().length >= 3);
  });

  $email.on('input', function () {
    validateField($(this), emailRegex.test($(this).val().trim()));
  });

  $phone.on('input', function () {
    validateField($(this), phoneRegex.test($(this).val().trim()));
  });

  $program.on('change', function () {
    validateField($(this), $(this).val() !== "");
  });

  $startDate.on('change', function () {
    validateField($(this), $(this).val() !== "");
  });

  // Form Submit Handler
  $form.on('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateField($fullName, $fullName.val().trim().length >= 3);
    const isEmailValid = validateField($email, emailRegex.test($email.val().trim()));
    const isPhoneValid = validateField($phone, phoneRegex.test($phone.val().trim()));
    const isProgramValid = validateField($program, $program.val() !== "");
    const isDateValid = validateField($startDate, $startDate.val() !== "");

    if (isNameValid && isEmailValid && isPhoneValid && isProgramValid && isDateValid) {
      $successAlert.removeClass('d-none');
      $form[0].reset();
      $('.form-control, .form-select').removeClass('is-valid is-invalid');
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        $successAlert.addClass('d-none');
      }, 5000);
    }
  });

  // ==========================================
  // 3. JQUERY EFFECTS & ANIMATIONS (Criterion 4)
  // ==========================================

  // Effect 1: Custom Accordion Toggle with jQuery
  $('.accordion-header-custom').on('click', function () {
    const content = $(this).next('.accordion-content-custom');
    const icon = $(this).find('i');

    $('.accordion-content-custom').not(content).slideUp(300);
    $('.accordion-header-custom i').not(icon).removeClass('fa-chevron-up').addClass('fa-chevron-down');

    content.slideToggle(300);
    icon.toggleClass('fa-chevron-down fa-chevron-up');
  });

  // Effect 2: Smooth Scrolling for Navigation Links
  $('.nav-link-custom').on('click', function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 80
      }, 1);
    }
  });

  // Effect 3: Button Hover Pulse/Scale Effect using jQuery
  $('.btn-primary').hover(
    function () { $(this).stop().animate({ opacity: 0.9 }, 150); },
    function () { $(this).stop().animate({ opacity: 1.0 }, 150); }
  );

});
// Меню батырмаларына басқан кезде қызыл түсті ауыстыру
$('.nav-link-custom').on('click', function() {
  $('.nav-link-custom').removeClass('active');
  $(this).addClass('active');
});

$(window).on('scroll', function() {
  let scrollPos = $(window).scrollTop() + 150;
  
  $('.section, header.page-header').each(function() {
    let top = $(this).offset().top;
    let bottom = top + $(this).outerHeight();
    let id = $(this).attr('id');

    if (scrollPos >= top && scrollPos <= bottom) {
      if (id) {
        $('.nav-link-custom').removeClass('active');
        $(`.nav-link-custom[href="#${id}"]`).addClass('active');
      }
    }
  });
});