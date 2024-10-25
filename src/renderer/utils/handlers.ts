const handleIsPickedFormat = (pickedFormat: string | null, item: string) => {
  return item === pickedFormat ? null : item;
};

const handleIsPickedCard = (isPickedCard: string | null, item: string) => {
  return item === isPickedCard ? null : item;
};

const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  }
  event.target.value = '';
};

const handleSave = (imageSrc: string | null) => {
  if (imageSrc) {
    console.log('Saving image:', imageSrc);
  }
};

const handleDelete = (
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  setImageSrc(null);
};

const handlePrint = () => {
  window.print();
};

export {
  handleDelete,
  handleFileChange,
  handleIsPickedCard,
  handleIsPickedFormat,
  handlePrint,
  handleSave,
};
