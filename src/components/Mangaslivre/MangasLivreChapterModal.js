import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import MangasLivreService from "./MangasLivre.service";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: "77%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: 50,
        left: "10%",
        height: "80%",
        overflowY:"scroll"
    },
});


class MangasLivreChapterModal extends React.Component {

    openChapter = (chapter) => event => {
        MangasLivreService.getMangaPages(chapter).then((data) => {
            localStorage.setItem("lastchapter", JSON.stringify(data));
            window.open("/lastmangachapter");
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Modal open={this.props.open}>
                    <div className={classes.paper}>
                        <Button onClick={this.props.btnClose}>
                            <Icon color="primary">close</Icon>
                        </Button>
                        {this.props.content.map((value, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <ul>
                                            <li>
                                                <Button color="primary" onClick={this.openChapter(value)}>
                                                    Capitulo - {value.name + "-" + value.number }
                                                    <Icon color="primary">description</Icon>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(MangasLivreChapterModal);