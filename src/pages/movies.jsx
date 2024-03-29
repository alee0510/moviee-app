import React from 'react'
import { Link } from 'react-router-dom'

// style
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../style/movies.css'

// redux
import { connect } from 'react-redux'

class Movies extends React.Component {

    renderCard = () => {
        return this.props.movies.map( (item, index) => {
            return (
                <Link to = {`/movieDetails?id=${item.id}`} key = {item.id}>
                    <Grid item 
                    className = 'all-grid' 
                    id = {item.id} 
                    >
                        <Card id = 'all-card'>
                            <img src = {item.poster} alt = 'poster-img' id = 'all-img'/>
                            <div id = 'all-overlay'></div>
                            <div id = 'all-title' > {item.title}</div>
                        </Card>
                    </Grid>
                </Link>
            )
    })}

    render () {
        if (this.props.movies.length === 0) {
            return (
                <div style = {{width : '50%', margin : 'auto'}}>
                    <CircularProgress color="secondary" style = {{ margin : '25vh 50%'}}/>
                </div>
            )
        }
        return (
            <div >
                <Grid container spacing={2} id = 'all-movie-container'>
                    <Grid item>
                        <h1 style = {{margin : '0px', padding : '0px'}}>All Movies</h1>
                    </Grid>
                    <Grid container spacing={2} id = 'all-movie-card-container'>
                        {this.renderCard()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStore = (state) => { // reducer
    return {
        movies : state.movie.movie
    }
}

export default connect(mapStore)(Movies)