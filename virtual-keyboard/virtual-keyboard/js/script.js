const Keyboard = {
  elements: {
    arrows: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create container elements
    this.elements.keysContainer = document.createElement('div');

    // Setup arrow elements
    this.elements.keysContainer.id = 'keyboard';
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keysContainer.appendChild(this.createArrows());

    // Add to DOM
    document.body.appendChild(this.elements.keysContainer);

    // Automatically use keyboard for elements with .output
    document.querySelectorAll('.output').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      ['~', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'], ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], 'Backspace',
      'Tab', ['Q', 'Й'], ['W', 'Ц'], ['E', 'У'], ['R', 'К'], ['T', 'Е'], ['Y', 'Н'], ['U', 'Г'], ['I', 'Ш'], ['O', 'Щ'], ['P', 'З'], ['{', 'Х'], ['}', 'Ъ'], ['|', '\\'],
      'CapsLock', ['A', 'Ф'], ['S', 'Ы'], ['D', 'В'], ['F', 'А'], ['G', 'П'], ['H', 'Р'], ['J', 'О'], ['K', 'Л'], ['L', 'Д'], [';', 'Ж'], ['"', 'Э'], 'Enter',
      'Shift', ['Z', 'Я'], ['X', 'Ч'], ['C', 'С'], ['V', 'М'], ['B', 'И'], ['N', 'Т'], ['M', 'Ь'], ['<', 'Б'], ['>', 'Ю'], ['?', '.'], 'Shift',
      'en', 'voice', 'micro', 'Alt', 'Space', 'Alt', 'win',
    ];

    keyLayout.forEach((key) => {
      const keyContainer = document.createElement('div');
      const sub = document.createElement('div');
      const char = document.createElement('div');

      // Add attributes/classes
      keyContainer.classList.add('key');

      switch (key) {
        case 'Backspace':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'delete';
          keyContainer.textContent = 'Backspace';

          keyContainer.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0,
              this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'Tab':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'tab';
          keyContainer.textContent = 'Tab';
          break;

        case 'CapsLock':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'caps';
          keyContainer.textContent = 'Caps Lock';
          keyContainer.addEventListener('click', () => {
            this.toggleCapsLock();
            keyContainer.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });
          break;

        case 'Enter':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'caps';
          keyContainer.textContent = 'Enter';

          keyContainer.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'Shift':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'shift';
          keyContainer.textContent = 'Shift';
          break;

        case 'en':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'language';
          keyContainer.textContent = 'en';
          break;

        case 'voice':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'voice';
          keyContainer.innerHTML = '&#128266';
          break;

        case 'micro':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'micro';
          keyContainer.innerHTML = '&#127908';
          break;

        case 'Alt':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'alt';
          keyContainer.textContent = 'Alt';
          break;

        case 'Space':
          keyContainer.classList.add('key');
          keyContainer.id = 'space';
          keyContainer.addEventListener('click', () => {
            this.properties.value += ' ';
          });
          break;

        case 'win':
          keyContainer.className = 'key smallfont';
          keyContainer.id = 'win';
          keyContainer.innerHTML = '&#8862';
          break;

        default:
          sub.classList.add('sub');
          char.classList.add('char');
          [sub.textContent, char.textContent] = key;
          keyContainer.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key[0].toUpperCase() : key[0].toLowerCase();
            this.triggerEvent('oninput');
          });
          break;
      }
      keyContainer.appendChild(sub);
      keyContainer.appendChild(char);
      fragment.appendChild(keyContainer);
    });
    return fragment;
  },
  createArrows() {
    const arrows = document.createElement('div');
    arrows.id = 'arrow';
    const left = document.createElement('div');
    left.classList.add('key');
    left.id = 'horizontal';
    left.innerHTML = '&#x2190';
    const updown = document.createElement('div');
    updown.id = 'updown';
    const up = document.createElement('div');
    up.classList.add('key');
    up.id = 'vertical';
    up.innerHTML = '&#x2191';
    const down = document.createElement('div');
    down.classList.add('key');
    down.id = 'vertical';
    down.innerHTML = '&#x2193';
    const right = document.createElement('div');
    right.classList.add('key');
    right.id = 'horizontal';
    right.innerHTML = '&#x2192';
    updown.appendChild(up);
    updown.appendChild(down);
    arrows.appendChild(left);
    arrows.appendChild(updown);
    arrows.appendChild(right);
    return arrows;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    // for (const key of this.elements.keys) {
    //   if (key.childElementCount === 0) {
    //     key.textContent = this.properties.capsLock
    //     ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    //   }
    // }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

window.addEventListener('DOMContentLoaded', () => Keyboard.init());
