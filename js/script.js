

// При нажатии на "+" будет открываться панель для добавления элементов

//--start--//
const showMenu = function(e){
	const parentElement = e.target.parentNode;
  	const addMenuElement = parentElement.querySelector('.choose-elem');
  	addMenuElement.classList.toggle('hidden');
};
const addButtonElements = document.querySelectorAll('.add-btn');
addButtonElements.forEach(function (item) {
    return item.addEventListener('click', showMenu);
  });

//--end--//


//Переключатель сетки

//--start--//
const setka = function(e){
	const newLayout = e.target.value;
	const layoutElement = document.querySelector('.layout');
  	layoutElement.classList.remove('layout--landing');
  	layoutElement.classList.remove('layout--blog');
  	layoutElement.classList.remove('layout--shop');
  	layoutElement.classList.add('layout--' + newLayout);

};
document.querySelector('.grid-select').addEventListener('change', setka);

//--end--//

//Кнопка для удаления элемента

//--start--//

const btnDelete = function(e){
	// найти родителя кнопки
	const element = e.target.parentNode;
	//найти *__elements-wrapper
	const wrapper = element.parentNode;
	//найти часть сайта - шапка, контент или подвал
	const block = wrapper.parentNode;

	  // удалить элемент
  	element.remove();

  	const wrapperItems = wrapper.querySelectorAll('.element');
  if (wrapperItems.length === 0) {
     
    if (block.classList.contains('header')) {
      block.classList.add('header--empty');
    } 

    if (block.classList.contains('content')) {
      block.classList.add('content--empty');
    }

    if (block.classList.contains('footer')) {
      block.classList.add('footer--empty');
    }
  }
};

//--end--//

const edit = function (e) {
  const editedElement = e.target;
  let currentValue;

  if (editedElement.tagName === 'IMG') {
    currentValue = editedElement.src;
  } else {
    currentValue = editedElement.textContent;
  }

  const newValue = window.prompt('Вы хотите поменять значение?', currentValue);

  if (newValue) {
    if (editedElement.tagName === 'IMG') {
      editedElement.src = newValue;
    } else {
      editedElement.textContent = newValue;
    }
  }
};

const addElement = function (e) {   

  const clickedBtn = e.target; 
  const addMenuElement = clickedBtn.parentNode;  

  addMenuElement.classList.add('hidden'); 

  const blockType = clickedBtn.dataset.type;
  const blockContainer = clickedBtn.dataset.container;


  const templateElement = document.querySelector('#' + blockType + '-template').content.cloneNode(true);
  const blockElement = templateElement.querySelector('.element');

  const containerWrapperElement = document.querySelector('.' + blockContainer + '__elements-wrapper');
  containerWrapperElement.append(blockElement);

  if (blockContainer.includes('content')) {
    containerWrapperElement.parentElement.classList.remove('content--empty');
  } else {
    containerWrapperElement.parentElement.classList.remove(blockContainer + '--empty');
  }


  blockElement.querySelector('.delete-btn').addEventListener('click', btnDelete);
  blockElement.querySelector('.template-content').addEventListener('dblclick', edit);

};


const chooseButtonElements = document.querySelectorAll('.choose-elem__btn');
chooseButtonElements.forEach(function (item) {
  return item.addEventListener('click', addElement);
});
