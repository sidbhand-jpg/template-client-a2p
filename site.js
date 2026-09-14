/* ==========================================================================
   {{BUSINESS_NAME}} — Site behavior
   1) Mobile nav toggle
   2) A2P-compliant chat widget: injected once, opened by any element with
      [data-chat-open], including every "Contact us" style button.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var mobileNav = document.querySelector(".mobile-nav");
    if (toggle && mobileNav) {
      toggle.addEventListener("click", function () {
        var open = mobileNav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  });

  /* ---------- Chat widget ---------- */

  var WIDGET_HTML = [
    '<button type="button" class="chat-launcher" id="chatLauncher" aria-haspopup="dialog" aria-controls="chatWidget">',
    '  <span class="chat-launcher__icon" aria-hidden="true">',
    '    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20V16H7L4 19V4Z" stroke="white" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    '  </span>',
    '  Have a question?',
    '</button>',

    '<div class="chat-widget" id="chatWidget" role="dialog" aria-modal="true" aria-labelledby="chatWidgetTitle" aria-hidden="true">',
    '  <div class="chat-widget__header">',
    '    <div class="chat-widget__title">',
    '      <span class="avatar" aria-hidden="true">{{BUSINESS_INITIALS}}</span>',
    '      <span id="chatWidgetTitle">Have a question?</span>',
    '    </div>',
    '    <button type="button" class="chat-widget__close" id="chatWidgetClose" aria-label="Close chat">&times;</button>',
    '  </div>',

    '  <form id="chatWidgetForm" novalidate>',
    '    <div class="chat-widget__body">',
    '      <p class="chat-widget__intro">Send us your number and a quick note — a member of the {{BUSINESS_NAME}} team will text or call you back.</p>',

    '      <div class="field">',
    '        <label for="chatPhone">Phone number</label>',
    '        <div class="phone-field">',
    '          <span class="phone-field__country">🇺🇸 +1</span>',
    '          <input type="tel" id="chatPhone" name="phone" placeholder="(555) 555-5555" autocomplete="tel" required>',
    '        </div>',
    '      </div>',

    '      <div class="field">',
    '        <label for="chatMessage">How can we help?</label>',
    '        <textarea id="chatMessage" name="message" rows="3" placeholder="I want to know more">I want to know more</textarea>',
    '      </div>',

    '      <label class="consent">',
    '        <input type="checkbox" name="consent_transactional" required>',
    '        <span>By submitting, you authorize {{BUSINESS_NAME}} to text/call the number above for informational/transactional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. See <a href="terms.html" target="_blank" rel="noopener">terms</a> and <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a>. Text HELP for help and STOP to unsubscribe.</span>',
    '      </label>',

    '      <label class="consent">',
    '        <input type="checkbox" name="consent_promotional">',
    '        <span>By submitting, you authorize {{BUSINESS_NAME}} to text/call the number above for promotional messages, possibly using automated means. Msg/data rates apply, msg frequency varies. Consent is not a condition of purchase. See <a href="terms.html" target="_blank" rel="noopener">terms</a> and <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a>. Text HELP for help and STOP to unsubscribe.</span>',
    '      </label>',
    '    </div>',

    '    <div class="chat-widget__footer">',
    '      <button type="submit" class="btn btn-primary chat-widget__send">',
    '        Send',
    '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 12L20 4L14 20L11 13L4 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    '      </button>',
    '      <p class="chat-widget__disclaimer">{{BUSINESS_NAME}} · {{BUSINESS_PHONE}} · Reply STOP to unsubscribe</p>',
    '    </div>',
    '  </form>',

    '  <div class="chat-widget__success" id="chatWidgetSuccess">',
    '    <h4>Thanks — message sent.</h4>',
    '    <p>We&rsquo;ll text or call you back shortly.</p>',
    '  </div>',
    '</div>'
  ].join("\n");

  function initChatWidget() {
    var mount = document.createElement("div");
    mount.id = "chatWidgetMount";
    mount.innerHTML = WIDGET_HTML;
    document.body.appendChild(mount);

    var launcher = document.getElementById("chatLauncher");
    var widget = document.getElementById("chatWidget");
    var closeBtn = document.getElementById("chatWidgetClose");
    var form = document.getElementById("chatWidgetForm");
    var success = document.getElementById("chatWidgetSuccess");

    function openWidget() {
      widget.classList.add("is-open");
      widget.setAttribute("aria-hidden", "false");
      launcher.setAttribute("aria-expanded", "true");
      var phoneInput = document.getElementById("chatPhone");
      if (phoneInput) phoneInput.focus();
    }

    function closeWidget() {
      widget.classList.remove("is-open");
      widget.setAttribute("aria-hidden", "true");
      launcher.setAttribute("aria-expanded", "false");
    }

    launcher.addEventListener("click", function () {
      if (widget.classList.contains("is-open")) {
        closeWidget();
      } else {
        openWidget();
      }
    });

    closeBtn.addEventListener("click", closeWidget);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && widget.classList.contains("is-open")) closeWidget();
    });

    // Every element on the page marked data-chat-open triggers this same widget.
    document.querySelectorAll("[data-chat-open]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openWidget();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Replace with your CRM / GHL webhook endpoint.
      // fetch("https://YOUR-ENDPOINT", { method: "POST", body: new FormData(form) });
      form.style.display = "none";
      success.classList.add("is-shown");
    });
  }

  document.addEventListener("DOMContentLoaded", initChatWidget);
})();
