const CanvasImage = () => {
  return (
    <Image
      image={image}
      draggable={true}
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'grab');
      }}
      onPointerDown={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'grabbing');
      }}
      onPointerUp={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'grab');
      }}
      onDragEnd={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'grab');
      }}
      onMouseLeave={(e) => {
        const container = e.target.getStage()?.container();
        container && (container.style.cursor = 'default');
      }}
    />
  );
};
