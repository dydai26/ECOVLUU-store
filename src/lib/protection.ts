// Захист від копіювання тексту
export const preventTextCopy = () => {
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    alert('Копіювання тексту заборонено');
  });

  document.addEventListener('cut', (e) => {
    e.preventDefault();
    alert('Вирізання тексту заборонено');
  });
};

// Захист від копіювання зображень
export const preventImageCopy = () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
    
    img.style.pointerEvents = 'none';
    img.style.userSelect = 'none';
  });
};

// Ініціалізація всіх захистів
export const initializeProtection = () => {
  preventTextCopy();
  preventImageCopy();
}; 