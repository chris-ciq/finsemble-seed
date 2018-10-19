import React from  'react'
import storeActions from '../stores/StoreActions'
import {getStore} from '../stores/LauncherStore'
import {FinsembleDraggable} from '@chartiq/finsemble-react-controls'

export default class FoldersList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			folders: storeActions.getFolders(),
			activeFolder: 'My Apps'
		}

	}
	
	onAppDrop(event, folder) {
		event.preventDefault()
		const app = JSON.parse(event.dataTransfer.getData('app'))
		//TODO: When adding to favorite do more stuff?
		if (folder.name === 'Favorites') {
			console.info('Dropped app in favorites.')
		}
		// Make sure app is not in folder already
		// Before attemping to add it
		folder.appDefinitions.findIndex((item) => {
			return item.name === app.name
		}) && storeActions.addAppToFolder(folder, app)
	}


	onAppFoldersUpdate() {
		this.setState({
			folders: storeActions.getFolders()
		})
	}

	onFolderClicked(folder) {
		getStore().setValue({
			field: 'activeFolder', 
			value: folder.name
		}, () => {
			this.setState({
				activeFolder: folder.name
			})
		})
	}

	componentWillMount() {
		getStore().addListener({field: 'appFolders'}, this.onAppFoldersUpdate.bind(this))
	}

	componentWillUnmount() {
		getStore().removeListener({field: 'appFolders'}, this.onAppFoldersUpdate.bind(this))
	}

	renderFoldersList() {
		return 	this.state.folders.map((folder, index) => {

			let className = 'complex-menu-section-toggle'
			if (this.state.activeFolder === folder.name) {
				className += ' active-section-toggle'
			}
			return <FinsembleDraggable
			draggableId={folder.name} 
			key={index} index={index}>
				<div onClick={() => this.onFolderClicked(folder)} 
				onDrop={(event) => this.onAppDrop(event, folder)} 
				className={className} key={index}>{folder.name}</div>
			</FinsembleDraggable>
		})
	}

	render() {
		return (
			<div className="top">
				{this.renderFoldersList()}
			</div>
			)
	}
}