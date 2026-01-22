type LoaderProps = {
  text?: string;
};

function Loader ({text = 'Načítám…'}: LoaderProps) {
    return (
        <div>
            {text}
        </div>
    )
};

export default Loader