import React, { Component } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../../stylesheets/setup.css'
import IconButton from '../atoms/IconButton'
import FileInput from '../molecules/FileInput'
import TextInput from '../atoms/TextInput'
import Button from '../atoms/Button'
import LoadingScreen from '../molecules/LoadingScreen'
import { uploadSpredsheet, uploadConceptsFile, fetchBlog, analyseBlog, validateBlogUrl } from '../scripts.js'
import Visualizer from './Visualizer'

class Setup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            blogData: {},
            spreadsheetFile: {},
            conceptsFile: {}
        }
        this.toastOptions = {
            position: 'top-center',
            autoClose: 2500
        }
        this.phase = 0
    }

    componentDidMount() {
        document.getElementsByClassName('input-url')[0].classList.toggle('hidden')
    }

    next = () => {
        this.phase++
        if(this.phase === 1)
        {
            document.getElementsByClassName('concept-input')[0].classList.toggle('hidden')
        }
        else if(this.phase === 2)
        {
            document.getElementsByClassName('spreadsheet-input')[0].classList.toggle('hidden')
        }
        else if(this.phase === 3)
        {
            document.getElementsByClassName('download-button')[0].classList.toggle('hidden')
        }
    }

    getBlogInfo = (event) => {
        let blogUrl = document.getElementById('URL-input').value
        if(validateBlogUrl(blogUrl))
        {
            this.props.setBlogAction(blogUrl)
            this.setState({ isLoading: true })
            fetchBlog(blogUrl)
            .then((res) => res.json())
            .then((blogData) => {
                this.setState({ blogData: blogData, isLoading: false })
                this.next()
            })
        }
        else
        {
            toast('Preencha o campo com uma URL válida!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    uploadSpreadsheet = (file) => {
        if(typeof file !== 'undefined' && file !== null)
        {
            this.setState({ isLoading: true })
            uploadSpredsheet(file, this.state.blogData.id, this.state.blogData.id)
            .then((res) => {
                console.log(res)
                if(res.statusText === 'OK') {
                    this.setState({ spreadsheetFile: file, isLoading: false })
                    this.next()
                }
            })
        }
        else
        {
            toast('Selecione um arquivo para fazer upload!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    uploadConcepts = (file) => {
        if(typeof file !== 'undefined' && file !== null)
        {
            this.setState({ isLoading: true })
            uploadConceptsFile(file, this.state.blogData.lastPost.id+'_concepts', this.state.blogData.id, this.state.blogData.lastPost.id)
            .then((res) => {
                console.log(res)
                if(res.statusText === 'OK') {
                    this.setState({ conceptsFile: file, isLoading: false })
                    this.next()
                }
            })
        }
        else
        {
            toast('Selecione um arquivo para fazer upload!', { position: this.toastOptions.position, autoClose: this.toastOptions.autoClose })
        }
    }

    startAnalysis = () => {
        this.setState({ isLoading: true })
        analyseBlog(this.state.blogData.id)
        .then((res) => {
            if(res.status === 200) {
                window.location.replace("./visualizer");
            }
        })
    }

    render() {

        let { isLoading } = this.state

        return (
            <div>
                <ToastContainer hideProgressBar={true} />
                {!isLoading ? (
                    <div class="setup-page-body">
                        <div class="input-url hidden">
                            <div class="input">
                                <label className="login-input-label">URL do blog</label>
                                <TextInput placeholder="URL" />
                            </div>
                            <IconButton icon="keyboard_return" onClick={this.getBlogInfo} />
                        </div>

                        <div class="file-input hidden spreadsheet-input">
                            <h5>Selecione a planilha .XLSX de notas</h5>
                            <FileInput action={this.uploadSpreadsheet} />
                        </div>

                        <div class="file-input hidden concept-input">
                            <h5>Selecione um arquivo .CSV com os conceitos</h5>
                            <FileInput action={this.uploadConcepts}/>
                        </div>

                        <div class="download-button hidden">
                            <Button label="Baixar análise do blog" onClick={this.startAnalysis} />
                        </div>
                    </div>
                ) : (
                    <LoadingScreen />
                ) }

            </div>
        )
    }

}

export default Setup