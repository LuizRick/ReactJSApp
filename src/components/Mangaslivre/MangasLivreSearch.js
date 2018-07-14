import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";
import FormControl from '@material-ui/core/FormControl';
import MangasLivreService from "./MangasLivre.service";
import MangasLivreChapertModal from "./MangasLivreChapterModal";

/**
 * Styles
 * @param {*} theme 
 */
const styles = theme => {
    return ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 400,
        },
        menu: {
            width: 200,
        },
        button: {
            margin: theme.spacing.unit,
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
        },
    })
};


class MangasLivreSearch extends Component {
    state = {
        search: "",
        results: [],
        modalOpened: false,
        content: [],
        page: 0
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    }

    handlerChapterBtnClick = (manga, page) => async event => {
        let pageCount = page;
        let newRequest = true;
        let chapters = [];
        do {
            let response = await MangasLivreService.getChapters(manga.id_serie, pageCount);
            let data = JSON.parse(response.data);
            if (!data.chapters)
                newRequest = false;
            else
                for(var x in data.chapters){
                    chapters.push(data.chapters[x]);
                }
            pageCount++;
        } while (newRequest);
        
        if(chapters.length > 0){
            this.setState({
                content: chapters,
                modalOpened:true
            });
        }
    }

    handleSubmit = event => {
        let search = this.state.search;
        MangasLivreService.search(search).then((response) => {
            let data = JSON.parse(response.data);
            if (data.series) {
                this.setState({
                    results: data.series
                });
            } else {
                alert("Não foi encontrado serie");
            }
        }).catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }

    handleModalOpened = () => {
        this.setState({
            modalOpened: true
        });
    }

    handleModalClosed = () => {
        this.setState({
            modalOpened: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <MangasLivreChapertModal
                    open={this.state.modalOpened} handleOpenModal={this.handleModalOpened}
                    content={this.state.content}
                    btnClose={this.handleModalClosed}
                />
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <FormControl>
                        <TextField
                            id="search"
                            label="Search"
                            className={classes.textField}
                            value={this.state.search}
                            onChange={this.handleChange('search')}
                            margin="normal"
                        />
                    </FormControl>
                    <Button variant="raised" color="primary" className={classes.button} type="submit">
                        Send <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                </form>
                {this.state.results.map((value, index) => {
                    return (
                        <div key={index} className="manga">
                            <figure>
                                <figcaption>
                                    <span title={value.label}>
                                        {(value.label.length > 20) ? value.label.substr(0, 20) + "..." : value.label}
                                    </span>
                                </figcaption>
                                <img src={value.cover} alt={value.label} />
                            </figure>
                            <div className="manga-options">
                                <Button href={"https://mangalivre.com" + value.link} target="_blank" className={classes.button}>
                                    Host <Icon color="primary" className={classes.rightIcon}>open_in_new</Icon>
                                </Button>
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.handlerChapterBtnClick(value, 1)}>
                                    Capitulos <Icon className={classes.rightIcon}>pageview</Icon>
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}


export default withStyles(styles)(MangasLivreSearch);