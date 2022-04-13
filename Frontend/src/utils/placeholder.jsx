import ImagePlaceholder from '../assets/imageplaceholder.png'

export const GridViewLoading = () => {
    return <div className='gamesShow'>
        <div className='imageWrapper'>
            <img src={`${ImagePlaceholder}`} alt='' className='imagePreview' /> 
        </div>
            <div className='gameTitle'>Loading...</div>
          <div className='bottomSection'>
                <div className='gamePrice'> 0,00 ,-</div>
                <div className='ownagePreviewFalse'>
                <>&#x2715;</>
                </div>
        </div>
    </div>
}

export const GridViewError = () => {
    return <div className='gamesShow'>
        <div className='imageWrapper'>
            <img src={`${ImagePlaceholder}`} alt='' className='imagePreview' /> 
        </div>
            <div className='gameTitle'>Error loading Data</div>
          <div className='bottomSection'>
                <div className='gamePrice'> 0,00 ,-</div>
                <div className='ownagePreviewFalse'>
                <>&#x2715;</>
                </div>
        </div>
    </div>
}