import React, { Component, Fragment } from 'react';
import { saveAs } from 'file-saver';
import { generateZip } from '../../utils';

class GetFiles extends Component {
    constructor() {
        super();

        this.state = { files: [] };
    }

    /**
     * I'm not sure if we should allow multiple file addition passes.
     * How will we deal with duplicate files being added? Even if they
     * have different content from different locations, this module has
     * no knowledge of this. I believe this will simply write over the 
     * prior file with the same name.
     *
     * @memberof GetFiles
     */
    handleFileAdd = (event) => {
        const { files } = event.target;
        this.setState({
            files: [...this.state.files, ...files]
        })
    }

    handleSubmit = (event) => {
        // start your engines...
        event.preventDefault();

        // blob is a zip file.
        generateZip(this.state.files).then((blob) => {
            // this is where we'd perform the upload.
            saveAs(blob, 'lineitem-number.zip');
        });
    }

    renderFileNames = () => (
        this.state.files.map( (file, index) => (
            <p key={index}>{file.name}</p>
        ))
    )

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} id='file-catcher'>
                    <input onChange={this.handleFileAdd} type='file' multiple />
                    <button type='submit'>
                        Submit
                    </button>
                </form>
                <div>{this.renderFileNames()}</div>
            </Fragment>
        );
    }
}

export default GetFiles;
