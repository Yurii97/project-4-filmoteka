import cardModalTpl from '../templates/card-modal.hbs';
import NewsApiService from './api';
import {genereObjForLS} from './record-loc-stor'

const refs = {
    backdrop: document.querySelector('.js-backdrop'),
    modalFilmCont: document.querySelector('.js-modal-container'),
    modalFilmInfo: document.querySelector('.js-film-info'),
    closeFilmModal: document.querySelector('.js-film-modal-close'),
    bodyEl: document.querySelector('body'),
    cardContainer: document.querySelector('.gallery'),
    
}

const newsApiService = new NewsApiService();

refs.cardContainer.addEventListener('click', openModalFilm);

// відкриваєм модалку
function openModalFilm(evt) {
  evt.preventDefault();

  

  const isFilmCardId = evt.path[2].dataset.id

  if (!isFilmCardId) {
      return;
    }
    
 newsApiService.fetchMoviesById(isFilmCardId).then(response => {

    refs.modalFilmInfo.insertAdjacentHTML('beforeend', cardModalTpl(response));
    genereObjForLS(response);    
  });

  refs.bodyEl.classList.add('scroll-hidden');
    refs.backdrop.classList.remove('backdrop--hidden');
     refs.backdrop.addEventListener('click', backdropClick);
  refs.closeFilmModal.addEventListener('click', closeModal);

  window.addEventListener('keydown', onPressEsc);
  
}

// close modal
function closeModal(evt) {
  refs.bodyEl.classList.remove('scroll-hidden');
  refs.backdrop.classList.add('backdrop--hidden');
  refs.backdrop.removeEventListener('click', backdropClick);
  window.removeEventListener('keydown', onPressEsc);
  refs.modalFilmCont.removeEventListener('click', onClikBtnFilmModal);   

}

// close escape
function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function backdropClick(evt) {
   if (evt.target === evt.currentTarget) {
    closeModal();
  }
}


// close modal
//  function closeModal(evt) {
//     refs.modalFilmInfo.innerHTML = '';

//   refs.bodyEl.classList.remove('scroll-hidden');
//   refs.backdrop.classList.add('backdrop--hidden');
//   refs.backdrop.removeEventListener('click', backdropClick);
//   window.removeEventListener('keydown', onPressEsc);
  

// }
