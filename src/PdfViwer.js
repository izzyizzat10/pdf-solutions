import {  useState } from 'react';
import { Document, pdfjs, Page } from 'react-pdf';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = () => {
    const [file, setFile] = useState('./acord-25-interactive.pdf');
    const [numPages, setNumPages] = useState();
    // const [containerRef, setContainerRef] = useState(null);
    // const [containerWidth, setContainerWidth] = useState();

    // const onResize = useCallback((entries) => {
    //     const [entry] = entries;

    //     if (entry) {
    //         setContainerWidth(entry.contentRect.width);
    //     }
    // }, []);

    // useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onFileChange(event) {
        const { files } = event.target;

        if (files && files[0]) {
            setFile(files[0] || null);
        }
    }

    function onDocumentLoadSuccess({ nextNumPages }) {
        setNumPages(nextNumPages);
    }
    const options = {
        cMapUrl: '/cmaps/',
        standardFontDataUrl: '/standard_fonts/',
    };

    //   const resizeObserverOptions = {};

    // const maxWidth = 800;

    return (
        <div className="Example">
            <header>
                <h1>react-pdf sample page</h1>
            </header>
            <div className="Example__container">
                <div className="Example__container__load">
                    <label htmlFor="file">Load from file:</label>{' '}
                    <input onChange={onFileChange} type="file" />
                </div>
                <div className="Example__container__document" >
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                // width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    )
}
export default PdfViewer;