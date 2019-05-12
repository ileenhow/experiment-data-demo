import React, { Component, createRef } from 'react'

export default class VideoPair extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoPaths: this.props.data.children
                .map(video => video.path.replace('./public', ''))
        }
        this.videoRefs = this.state.videoPaths.map(() => {
            return createRef()
        })
    }

    handleVideoPlay = () => {
        this.videoRefs.forEach(ref => {
            ref.current.play()
        })
    }

    componentDidMount = () => {
        this.videoRefs.forEach(ref => {
            ref.current.addEventListener('play', this.handleVideoPlay)
        })
    }

    componentWillUnmount = () => {
        this.revideoRefsfs.forEach(ref => {
            ref.current.removeEventListener('play', this.handleVideoPlay)
        })
    }

    render() {
        return (
            <div className="video-pair">
                {this.state.videoPaths.map((path, i) => (
                    <video preload="meta" ref={this.videoRefs[i]} controls src={path}></video>
                ))}
            </div>
        )
    }
}
