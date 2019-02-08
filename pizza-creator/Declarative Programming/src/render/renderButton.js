export default function renderButton({onPlaceButtonClick, onResetButtonClick}){
    const rootElement = document.createElement('div');
    rootElement.classList.add('section');

    const placeButton =document.createElement('button');
    placeButton.type='submit';
    placeButton.innerHTML='Place Order';
    placeButton.onclick = () => {
        onPlaceButtonClick();
    }
    const resetButton =document.createElement('button');
    resetButton.type='reset';
    resetButton.innerHTML='Clear';
    resetButton.onclick = () => {
        onResetButtonClick();
    }

    rootElement.append(placeButton,resetButton);
    return rootElement;
  }