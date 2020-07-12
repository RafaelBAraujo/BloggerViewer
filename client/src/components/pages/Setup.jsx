import React, { Component } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import Modal from 'react-bootstrap/Modal'
import Carousel from 'react-bootstrap/Carousel'
import 'react-toastify/dist/ReactToastify.css'
import { ExportToCsv } from 'export-to-csv'

import '../../stylesheets/setup.css'
import IconButton from '../atoms/IconButton'
import FileInput from '../molecules/FileInput'
import TextInput from '../atoms/TextInput'
import Button from '../atoms/Button'
import LoadingScreen from '../molecules/LoadingScreen'
import ConceptSetup from './ConceptSetup'
import { uploadSpredsheet, uploadConceptsFile, uploadMeetFile, fetchBlog, fetchPostById, analyseBlog, validateBlogUrl, sendRegexList } from '../scripts.js'

class Setup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            blogData: {},
            posts: [],
            spreadsheetFile: {},
            conceptsFile: {},
            meetFile: {},
            meetdata: [],
            concepts: [],
            conceptRegex: {},
            csvData: [],
            showModal: false
        }
        this.download = this.download.bind(this)
        this.toastOptions = {
            position: 'top-center',
            autoClose: 2500
        }
        this.phase = 0
        this.test = [
            ['firstname', '0', '1', '2', '3', '4', '5', '6'] ,
            ['John', 'Doe' , 'john.doe@xyz.com'] ,
            ['Jane', 'Doe' , 'jane.doe@xyz.com']
        ]
    }

    componentDidMount() {
        document.getElementsByClassName('input-url')[0].classList.toggle('hidden')
    }

    toggleModal = () => {
        document.getElementById('regex-modal').classList.toggle('hidden')
        this.setState({ showModal: !(this.state.showModal) })
    }

    download() {
        let data = []
        let header = ['conceito']
        let count = 0

        this.state.concepts.forEach((concept) => { 
            if(concept.regexList.length > count) {
                count = concept.regexList.length
            }
        })

        for(let i = 0; i < count; ++i) {
            header.push(i.toString())
        }

        this.state.concepts.forEach((concept) => {
            let newRow = []
            newRow.push(concept.keyword)
            concept.regexList.forEach((regex) => {
                if(typeof regex.regex !== 'undefined' && regex.regex !== '') {
                    if(typeof regex.weight === 'undefined') { regex.weight = 0 }
                    newRow.push(regex.regex + 'weight:' + regex.weight)
                }
                console.log('newRow')
                console.log(newRow)
            })
            data.push(newRow)
        })
        console.log(data)
        this.setState({ csvData: data }, () => {
            let options = { 
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalSeparator: '.',
                showLabels: true, 
                showTitle: false,
                useTextFile: false,
                useBom: true,
                useKeysAsHeaders: false,
                headers: header
              };
            let csvExporter = new ExportToCsv(options);
            csvExporter.generateCsv(data);
        })
        
    }

    updateRegexList = (concept, regexList) => {
        let concepts = this.state.concepts
        concepts.forEach((el) => {
            if (el.keyword === concept) {
                el.regexList = regexList
            }
        })
        this.setState({ concepts: concepts })
    }

    next = () => {
        this.phase++
        if (this.phase === 1) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('post-input')[0].classList.toggle('hidden')
        }
        else if (this.phase === 2) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('concept-input')[0].classList.toggle('hidden')
        }
        else if (this.phase === 3) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('concept-setup')[0].classList.toggle('hidden')
        }
        else if (this.phase === 4) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('spreadsheet-input')[0].classList.toggle('hidden')
        }
        else if (this.phase === 5) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('meet-input')[0].classList.toggle('hidden')
        }
        else if (this.phase === 6) {
            console.log('phase: ' + this.phase)
            document.getElementsByClassName('download-button')[0].classList.toggle('hidden')
        }
    }

    getBlogInfo = (event) => {
        let blogUrl = document.getElementById('URL-input').value
        if (validateBlogUrl(blogUrl)) {
            this.props.setBlogAction(blogUrl)
            this.setState({ isLoading: true })
            fetchBlog(blogUrl)
                .then((res) => res.json())
                .then((blogData) => {
                    let posts = []
                    blogData.posts.forEach((post) => {
                        posts.push({
                            postId: post.id,
                            postTitle: post.title
                        })
                    })
                    this.setState({ blogData: blogData, posts: posts, isLoading: false })
                    this.next()
                })
        }
        else {
            toast('Preencha o campo com uma URL válida!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    getPostInfo = () => {
        let postPicklist = document.getElementById('post-picklist')
        let selectedPost = postPicklist.options[postPicklist.selectedIndex].value;
        if (selectedPost !== 0) {
            this.setState({ isLoading: true })
            fetchPostById(this.state.blogData.id, selectedPost)
                .then((res) => res.json())
                .then((post) => {
                    let blogData = this.state.blogData
                    blogData.post = post
                    this.setState({ blogData: blogData, isLoading: false })
                    this.next()
                })
        }
    }

    uploadSpreadsheet = (file) => {
        if (typeof file !== 'undefined' && file !== null) {
            this.setState({ isLoading: true })
            uploadSpredsheet(file, this.state.blogData.id, this.state.blogData.id)
                .then((res) => {
                    console.log(res)
                    if (res.statusText === 'OK') {
                        this.setState({ spreadsheetFile: file, isLoading: false })
                        this.next()
                    }
                })
        }
        else {
            toast('Selecione um arquivo para fazer upload!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    uploadConcepts = (file) => {
        if (typeof file !== 'undefined' && file !== null) {
            this.setState({ isLoading: true })
            // uploadConceptsFile(file, this.state.blogData.lastPost.id+'_concepts', this.state.blogData.id, this.state.blogData.lastPost.id)
            uploadConceptsFile(file, this.state.blogData.post.id + '_concepts', this.state.blogData.id, this.state.blogData.post.id)
                .then((res) => {
                    if (res.statusText === 'OK') {
                        this.setState({ conceptsFile: file, concepts: Array.from(res.data), isLoading: false })
                        this.next()
                    }
                })
        }
        else {
            toast('Selecione um arquivo para fazer upload!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    uploadMeet = (file) => {

        if (typeof file !== 'undefined' && file !== null) {
            this.setState({ isLoading: true })
            uploadMeetFile(file, this.state.blogData.post.id + '_meet', this.state.blogData.id, this.state.blogData.post.id)
            .then((res) => {
                if (res.statusText === 'OK') {
                    this.setState({ meetFile: file, meetData: Array.from(res.data), isLoading: false })
                    this.next()
                }
            })
        }
        else {
            toast('Selecione um arquivo para fazer upload!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }

    }

    saveConceptRegex = () => {
        this.setState({ isLoading: true })
        sendRegexList(this.state.blogData.id, this.state.blogData.post.id, this.state.concepts)
            .then((res) => {
                this.setState({ isLoading: false })
                this.next()
            })
    }

    startAnalysis = () => {
        this.setState({ isLoading: true })
        analyseBlog(this.state.blogData.id)
            .then((res) => {
                if (res.status === 200) {
                    window.location.replace('./visualizer/' + this.state.blogData.id + '/' + this.state.blogData.post.id);
                }
            })
    }

    render() {

        let { isLoading } = this.state

        return (
            <div>
                <ToastContainer hideProgressBar={true} />
                {!isLoading ? (
                    <div className="setup-page-body">

                        <div className="input-url hidden">
                            <div className="input">
                                <label className="login-input-label">URL do blog</label>
                                <TextInput placeholder="URL" />
                            </div>
                            <IconButton icon="keyboard_return" onClick={this.getBlogInfo} />
                        </div>

                        <div className="post-input hidden">
                            <div className="input">
                                <h5>Selecione o post para análise</h5>
                                <select className="form-control" id="post-picklist">
                                    {this.state.posts.length !== 0 ? (
                                        this.state.posts.map((post) => {
                                            return (
                                                <option key={post.postId} value={post.postId}>{post.postTitle}</option>
                                            )
                                        })
                                    ) : (
                                            <option value={0}>{}</option>
                                        )}
                                </select>
                            </div>
                            <IconButton icon="keyboard_return" onClick={this.getPostInfo} />
                        </div>

                        <div className="file-input hidden spreadsheet-input">
                            <h5>Selecione a planilha .XLSX de notas</h5>
                            <FileInput action={this.uploadSpreadsheet} />
                        </div>

                        <div className="file-input hidden concept-input">
                            <h5>Selecione um arquivo .CSV com os conceitos</h5>
                            <FileInput action={this.uploadConcepts} />
                        </div>

                        <div className="file-input hidden meet-input">
                            <h5>Selecione o arquivo do último Meet</h5>
                            <FileInput action={this.uploadMeet} />
                        </div>

                        <div className="concept-setup hidden">
                            <ConceptSetup concepts={this.state.concepts} updateRegexList={this.updateRegexList} />
                            <button className="testt btn btn-secondary" onClick={this.saveConceptRegex}>Salvar</button>
                            <button className="testt btn btn-secondary" onClick={this.toggleModal}>Instruções</button>
                            <button className="testt btn btn-secondary" onClick={this.download}>Baixar CSV</button>
                        </div>

                        <div className="download-button hidden">
                            <Button label="Baixar análise do blog" onClick={this.startAnalysis} />
                        </div>

                        <div id="regex-modal" className="hidden">


                            <Modal show={this.state.showModal} size={'xl'} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Expressões Regulares</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Carousel interval={null}>
                                        <Carousel.Item>
                                            <p>
                                                Nesta página de listagem dos <b>conceitos</b>, é possível adicionar expressões regulares para a busca de palavras. Para cada expressão adicionada a um conceito, o sistema irá procurar em cada comentário escrito pelos alunos elementos que correspondam à expressão.
                                            </p>
                                            <p><b>O Peso</b> de cada expressão regular definirá a importância de suas combinações e usará como métrica para definir se o <b>conceito</b> foi ou não utilizado.</p>
                                            <p>No final da busca, o sistema fará, para cada conceito, a soma dos pesos de cada expressão encontrada divido pelo total dos pesos.</p>
                                            <p>(soma de pesos das combinações)/(total dos pesos)</p>
                                            <p>Por exemplo:</p>
                                            <p>Definidas as seguintes expressões regulares para o conceito "Revolução Industrial"</p>
                                            <li>^Revolução$ (peso: 1)</li>
                                            <li>^Industrial$ (peso: 1)</li><p></p>
                                            <p>Dado o cenário em que se encontre apenas a palavra "revolução", o sistema deverá retornar de seu cálculo <b>0.5</b></p>
                                            <p>Esse valor poderá ser interpretado como métrica para a satisfação do uso do conceito.</p>
                                            <p className="yellow-bg"><b>Importante:</b></p>
                                            <p>Caso um peso não seja definido a uma expressão, esta terá peso <b>absoluto.</b> Isso é, caso encontrada uma combinação, o sistema considerará o uso do conceito correspondente como <b>certeza.</b></p>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <b>O que são expressões regulares:</b>
                                            <p>
                                                Expressão regular é uma sequência de caracteres que definem um padrão de busca. Estes padrões normalmente são utilizado para busca de palavras em texto.
                                            </p>
                                            <p>Este sistema possibilita a escrita de expressões regulares (Regex) para a busca de palavras. Através delas, são feitas buscas nos comentários dos alunos para definir o nível de satisfação do uso de um <b>conceito.</b></p>
                                            <p><b>Exemplo:</b></p>
                                            <p><b>Dado o seguinte comentário:</b></p>
                                            <p><b>Toyotismo</b> é um sistema de <b>produção</b> <b>industrial</b> de mercadorias desenvolvido no Japão após a Segunda Guerra Mundial. O sistema levou esse nome pois foi instalado na fábrica da Toyota a partir da década de 1960.</p>
                                            <p><b>Dado o seguinte regex:</b></p>
                                            <p><b>^toyotismo.+produção.+industria?industrial?</b></p>
                                            <p>A expressão acima procura pela palavra <b>toyotismo</b> seguida pela palavra <b>produção</b> seguida OU NÃO pela palavra <b>industria</b>, seguida OU NÃO pela palavra <b>industrial.</b></p>
                                            <p>Se aplicada ao comentário acima, será encontrada uma combinação que atende a expressão, pois é possível encontrar estas palavras na <b>ordem</b> e <b>quantidade</b> definidas.</p>
                                            <p></p>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <p>
                                                O domínio de expressões regulares permite ao usuário buscas complexas de palavras e, com certa eficiência, definir o teor do texto.
                                            </p>
                                            <p>
                                                Pode-se encontrar na internet um vasto conteúdo sobre a "linguagem" e aplicações.
                                            </p>
                                            <p>Um vídeo bastante conciso e explicativo pode ser encontrado <a href="https://www.youtube.com/watch?v=sa-TUpSx1JA">aqui</a></p>
                                            <p>Outras referências:</p>
                                            <ul>
                                                <li>https://bit.ly/38hyk2y</li>
                                                <li>https://bit.ly/3ifIkxF</li>
                                                <li>https://bit.ly/2YK5iFp</li>
                                            </ul>
                                            <p>É possível <b>testar</b> expressões regulares neste <a href="https://regex101.com/">site</a></p>
                                            <p>
                                                Nos seguintes slides encontra-se resumidamente uma referência aos caracteres especiais de expressões regulares e suas descrições.
                                            </p>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <h5>Âncoras</h5>
                                            <p>Âncoras procuram por limites, como nova linha, espaço, ponto, etc.</p>
                                            <div className="regex-list">
                                                <div className="regex">
                                                    <div className="regex-value">^</div>
                                                    <div className="regex-desc">Início da palavra</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">$</div>
                                                    <div className="regex-desc">Final da palavra</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\b</div>
                                                    <div className="regex-desc">Fronteira</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\B</div>
                                                    <div className="regex-desc">"Não" fronteira</div>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <h5>Caracteres</h5>

                                            <div className="regex-list">
                                                <div className="regex">
                                                    <div className="regex-value">.</div>
                                                    <div className="regex-desc">Qualquer caractere exceto nova linha</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\d</div>
                                                    <div className="regex-desc">Dígitos (0-9)</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\D</div>
                                                    <div className="regex-desc">Caracteres que não são dígitos (0-9)</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\w</div>
                                                    <div className="regex-desc">Caracteres "de palavra" (a-z, A-Z, 0-9, _)</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\W</div>
                                                    <div className="regex-desc">Caracteres que não são letras ou números</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\s</div>
                                                    <div className="regex-desc">Espaço em branco (espaço, tab, nova linha)</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">\S</div>
                                                    <div className="regex-desc">Caracteres que não são espaços</div>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <h5>Agrupadores</h5>

                                            <div className="regex-list">
                                                <div className="regex">
                                                    <div className="regex-value">[]</div>
                                                    <div className="regex-desc">Combina com caracteres entre os brackets. (por ex. [-,_])</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">[^]</div>
                                                    <div className="regex-desc">Combina com caracteres que NÃO ESTÃO entre os brackets.</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">|</div>
                                                    <div className="regex-desc">Expressão "OU". Usada em grupos. Define combinação opcional. (por ex. (-|_), combina traço OU underline)</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">()</div>
                                                    <div className="regex-desc">Usado para definir um grupo de expressões</div>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                        <Carousel.Item>
                                            <h5>Quantificadores</h5>

                                            <div className="regex-list">
                                                <div className="regex">
                                                    <div className="regex-value">*</div>
                                                    <div className="regex-desc">Zero ou mais</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">+</div>
                                                    <div className="regex-desc">Um ou mais</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">?</div>
                                                    <div className="regex-desc">Zero ou um</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">{"{3}"}</div>
                                                    <div className="regex-desc">Número exato</div>
                                                </div>
                                                <div className="regex">
                                                    <div className="regex-value">{"{3,4}"}</div>
                                                    <div className="regex-desc">Intervalo (max, min)</div>
                                                </div>
                                            </div>
                                        </Carousel.Item>

                                    </Carousel>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button label="Fechar" variant="secondary" onClick={this.toggleModal} >
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>


                    </div>
                ) : (
                        <LoadingScreen />
                    )}

            </div>
        )
    }

}

export default Setup