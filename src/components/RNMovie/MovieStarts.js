
import React from 'react'

import StarRating from 'react-native-star-rating';

class MovieStars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5
        };
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (
            <StarRating
                disabled={false}
                rating={this.props.rating/2}
                maxStars={5}
                halfStarEnabled={true}
                fullStar={require('../images/icon_selected.png')}
                emptyStar={require('../images/icon_unselect.png')}
                halfStar={require('../images/icon_half_select.png')}
                rating={this.state.starCount}
                starStyle={{width:12,height:12}}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />);
    }
}

export default MovieStars;