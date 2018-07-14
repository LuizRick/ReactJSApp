import axios from "axios";
import Config from "config/Config";



export default class MangarLivreService {

    static async search(value) {
        let data;
        await axios.post(`${Config.API_SERVER}/Home/MangaLivre/`, {
            Url: "https://mangalivre.com/lib/search/series.json",
            BodyRequest: {
                "search": value
            }
        }).then(function (response) {
            data = response;
        }).catch(function () {
            console.log(arguments);
        });
        return data;
    }

    static async getChapters(id_serie, page) {
        let data;
        await axios
            .post(`${Config.API_SERVER}/Home/MangaLivre/`, {
                Url: `https://mangalivre.com/series/chapters_list.json?page=${page}&id_serie=${id_serie}`,
                RequestType: 1,
                BodyRequest: {}
            })
            .then((response) => {
                data = response;
            }).catch(function () {
                console.log(arguments);
            });
        return data;
    }

    static async getMangaPages(chapter) {
        let data;
        await axios.post(`${Config.API_SERVER}/Home/MangaLivre/`, {
            url: `https://mangalivre.com/${chapter.releases._scan129.link}`,
            RequestType: 1,
            BodyRequest: {},
            isAjax: false
        }).then( async (response)  => {
            try {
                let dataHtml = response.data;
                let doc = document.implementation.createHTMLDocument();
                doc.documentElement.innerHTML = dataHtml;
                let token = new URL(doc.getElementsByTagName("script")[18].src).searchParams.get("token");
                data = await this.getMangaPagesUlr(token,chapter);
            } catch (ex) {
                alert("ooops erro na aplicação na hora de fazer hack nos manga pages");
                console.log(ex);
            }

        }).catch((erro) => {
            console.log(erro);
        });
        return data;
    }

    static async getMangaPagesUlr(token,chapter){
        let data;
        await axios.post(`${Config.API_SERVER}/Home/MangaLivre/`, {
            url: `https://mangalivre.com/leitor/pages.json?key=${token}&id_release=${chapter.releases._scan129.id_release}`,
            RequestType: 1,
            BodyRequest: {},
        }).then((response) => {
            data = JSON.parse(response.data);
        }).catch( err => console.log(err));
        return data;
    }
}