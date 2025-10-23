function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Copied to clipboard: ' + textToCopy);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Simple gallery lightbox and filtering
let items = Array.from(document.querySelectorAll('.masonry-item'));
let currentIndex = -1;

function openLightbox(index){
const item = items[index];
if(!item) return;
const img = item.querySelector('img');
lightboxImg.src = img.src;
lightboxImg.alt = img.alt || '';
lightboxCaption.textContent = item.querySelector('figcaption')?.textContent || '';
lightbox.setAttribute('aria-hidden','false');
currentIndex = index;
// trap focus if desired (simple)
closeBtn.focus();
}

function closeLightbox(){
lightbox.setAttribute('aria-hidden','true');
lightboxImg.src = '';
currentIndex = -1;
}

function showNext(delta){
if(currentIndex === -1) return;
let newIndex = currentIndex + delta;
if(newIndex < 0) newIndex = items.length - 1;
if(newIndex >= items.length) newIndex = 0;
openLightbox(newIndex);
}

// click on gallery image
gallery.addEventListener('click', e => {
const fig = e.target.closest('.masonry-item');
if(!fig) return;
const index = items.indexOf(fig);
if(index >= 0) openLightbox(index);
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));

// keyboard
document.addEventListener('keydown', e => {
if(lightbox.getAttribute('aria-hidden') === 'false'){
if(e.key === 'Escape') closeLightbox();
if(e.key === 'ArrowLeft') showNext(-1);
if(e.key === 'ArrowRight') showNext(1);
}
});

// filtering
filter.addEventListener('change', () => {
const val = filter.value;
items.forEach(i => {
const cat = i.getAttribute('data-category') || 'uncategorized';
if(val === 'all' || val === cat){
i.style.display = '';
} else {
i.style.display = 'none';
}
});
// rebuild items list to account for hidden ones
items = Array.from(document.querySelectorAll('.masonry-item')).filter(i => i.style.display !== 'none');
});

