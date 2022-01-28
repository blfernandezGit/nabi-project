const Index = ({image}) => {
    console.log(image.url)
    return (
        <>
            <img
            src={image.url}
            alt='test'
            loading="lazy"
            style = {{maxWidth: '70%'}}
          />
        </>
    );
};

export default Index;