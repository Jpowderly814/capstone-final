"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Next_1 = require("./icons/Next");
var Pause_1 = require("./icons/Pause");
var Play_1 = require("./icons/Play");
var Previous_1 = require("./icons/Previous");
var styles_1 = require("../styles");
var Wrapper = styles_1.styled('div')({}, function (_a) {
    var style = _a.style;
    return ({
        alignItems: 'center',
        display: 'flex',
        height: styles_1.px(style.h),
        justifyContent: 'center',
        '@media (max-width: 767px)': {
            padding: styles_1.px(10),
        },
        '> div': {
            minWidth: styles_1.px(style.h),
            textAlign: 'center',
        },
        button: {
            color: style.c,
            fontSize: styles_1.px(16),
            '&.rswp__toggle': {
                fontSize: styles_1.px(28),
            },
        },
    });
}, 'ControlsRSWP');
function Controls(props) {
    var isExternalDevice = props.isExternalDevice, isPlaying = props.isPlaying, nextTracks = props.nextTracks, onClickNext = props.onClickNext, onClickPrevious = props.onClickPrevious, onClickTogglePlay = props.onClickTogglePlay, previousTracks = props.previousTracks, _a = props.styles, color = _a.color, height = _a.height;
    return (React.createElement(Wrapper, { style: { c: color, h: height } },
        React.createElement("div", null, (!!previousTracks.length || isExternalDevice) && (React.createElement("button", { "aria-label": "Previous Track", onClick: onClickPrevious, type: "button" },
            React.createElement(Previous_1.default, null)))),
        React.createElement("div", null,
            React.createElement("button", { "aria-label": isPlaying ? 'Pause' : 'Play', className: "rswp__toggle", onClick: onClickTogglePlay, type: "button" }, isPlaying ? React.createElement(Pause_1.default, null) : React.createElement(Play_1.default, null))),
        React.createElement("div", null, (!!nextTracks.length || isExternalDevice) && (React.createElement("button", { "aria-label": "Next Track", onClick: onClickNext, type: "button" },
            React.createElement(Next_1.default, null))))));
}
exports.default = Controls;
//# sourceMappingURL=Controls.js.map