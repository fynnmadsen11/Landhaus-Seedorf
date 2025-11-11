// kleines Formularverhalten: validieren, speichern, Bestätigungen zeigen
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const bookingResult = document.getElementById('bookingResult');
  const contactForm = document.getElementById('contactForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(bookingForm);
      const obj = Object.fromEntries(data.entries());
      // einfache Validierung: checkin < checkout
      if (obj.checkin && obj.checkout && obj.checkin >= obj.checkout) {
        alert('Bitte wählen Sie ein gültiges Check‑out Datum (nach Check‑in).');
        return;
      }
      // simulate send
      bookingForm.reset();
      if (bookingResult) {
        bookingResult.classList.remove('hidden');
        bookingResult.innerHTML = `<h3>Danke, ${escapeHtml(obj.name || '')}!</h3>
          <p>Ihre Anfrage für ${escapeHtml(obj.accommodation || '')} (${escapeHtml(obj.checkin)} → ${escapeHtml(obj.checkout)}) wurde erhalten. Wir melden uns per E‑Mail.</p>`;
      }
      // Optionally save to localStorage (nur beispiel)
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push({...obj, date: new Date().toISOString()});
      localStorage.setItem('bookings', JSON.stringify(bookings));
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const obj = Object.fromEntries(data.entries());
      contactForm.reset();
      alert('Vielen Dank! Ihre Nachricht wurde gesendet. Wir antworten zeitnah.');
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push({...obj, date: new Date().toISOString()});
      localStorage.setItem('contacts', JSON.stringify(contacts));
    });
  }
});

function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}