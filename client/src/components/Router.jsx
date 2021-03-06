import React from "react";
import {connect} from 'react-redux';
import {
    currentRoomSelector,
    playlistSelector,
    profileNameSelector, roomAttendeesSelector,
    roomPlaylistsSelector,
    roomsSelector, speechSelector, spotifyCurrentPlaylistUriSelector, spotifyCurrentTrackSelector
} from "../redux/selectors/selectors";
import Homepage from "./Homepage";
import ActiveRoomAttendee from "./ActiveRoomAttendee";
import {getPlaylists, playPlaylist} from "../redux/actionCreators/spotifyActionCreators";
import ActiveRoomOwner from "./ActiveRoomOwner";
import {
    saveRoomPlaylists,
    getRoomPlaylists,
    saveRoomPlaylistPhrases,
    receiveSpeech
} from "../redux/actionCreators/roomActionCreators";

class Router extends React.Component {
    render() {
        if (!this.props.currentRoom) {
            return <Homepage/>;
        } else if (this.props.profileName === this.props.currentRoom.owner) {
            return <ActiveRoomOwner room={this.props.currentRoom}
                                    getPlaylists={this.props.getPlaylists}
                                    playlists={this.props.playlists}
                                    profileName={this.props.profileName}
                                    saveRoomPlaylists={this.props.saveRoomPlaylists}
                                    roomPlaylists={this.props.roomPlaylists}
                                    getRoomPlaylists={this.props.getRoomPlaylists}
                                    playPlaylist={this.props.playPlaylist}
                                    currentTrack={this.props.currentTrack}
                                    currentPlaylistUri={this.props.currentPlaylistUri}
                                    saveRoomPlaylistPhrases={this.props.saveRoomPlaylistPhrases}
                                    receiveSpeech={this.props.receiveSpeech}
                                    speechLog={this.props.speechLog}
                                    roomAttendees={this.props.roomAttendees}
            />;
        } else {
            return <ActiveRoomAttendee room={this.props.currentRoom} roomAttendees={this.props.roomAttendees}/>;
        }
    }
};

export default connect(
    state => ({
        myRooms: roomsSelector(state),
        currentRoom: currentRoomSelector(state),
        playlists: playlistSelector(state),
        profileName: profileNameSelector(state),
        roomPlaylists: roomPlaylistsSelector(state),
        currentTrack: spotifyCurrentTrackSelector(state),
        currentPlaylistUri: spotifyCurrentPlaylistUriSelector(state),
        speechLog: speechSelector(state),
        roomAttendees: roomAttendeesSelector(state)
    }),
    dispatch => ({
        getPlaylists: () => dispatch(getPlaylists()),
        saveRoomPlaylists: (room, playlists) => dispatch(saveRoomPlaylists(room, playlists)),
        getRoomPlaylists: (room) => dispatch(getRoomPlaylists(room)),
        playPlaylist: (playlistId) => dispatch(playPlaylist(playlistId)),
        saveRoomPlaylistPhrases: (roomId, playlistId, phraseArray) => dispatch(saveRoomPlaylistPhrases(roomId, playlistId, phraseArray)),
        receiveSpeech: (speech) => dispatch(receiveSpeech(speech))
    }),
    (stateProps, dispatchProps) => ({
        ...stateProps,
        ...dispatchProps,
        saveRoomPlaylists: (playlists) => dispatchProps.saveRoomPlaylists(stateProps.currentRoom, playlists),
        getRoomPlaylists: () => dispatchProps.getRoomPlaylists(stateProps.currentRoom)
    })
)(Router);