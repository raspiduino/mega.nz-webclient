var React = require("react");
var ContactsUI = require('./../contacts.jsx');
var ConversationMessageMixin = require('./mixin.jsx').ConversationMessageMixin;
import { Emoji, ParsedHTML } from '../../../ui/utils.jsx';

class PrivilegeChange extends ConversationMessageMixin {
    haveMoreContactListeners() {
        if (!this.props.message.meta || !this.props.message.meta.targetUserId) {
            return false;
        }

        var uid = this.props.message.meta.targetUserId;
        if (uid && M.u[uid]) {
            return uid;
        }
        return false;
    }
    render() {
        var self = this;

        var message = this.props.message;
        var chatRoom = this.props.message.chatRoom;
        var contact = self.getContact();
        var timestampInt = self.getTimestamp();
        var timestamp = self.getTimestampAsString();



        var datetime = <div className="message date-time simpletip"
            data-simpletip={time2date(timestampInt)}>{timestamp}</div>;

        var displayName;
        if (contact) {
            displayName = generateAvatarMeta(contact.u).fullName;
        }
        else {
            displayName = contact;
        }

        var messages = [];



        var otherContact = M.u[message.meta.targetUserId] ? M.u[message.meta.targetUserId] : {
            'u': message.meta.targetUserId,
            'h': message.meta.targetUserId,
            'c': 0
        };

        var avatar = <ContactsUI.Avatar contact={otherContact}
            className="message avatar-wrapper small-rounded-avatar"
            chatRoom={chatRoom} />;
        var otherDisplayName = generateAvatarMeta(otherContact.u).fullName;

        var newPrivilegeText = "";
        if (message.meta.privilege === 3) {
            newPrivilegeText = l[8875];
        }
        else if (message.meta.privilege === 2) {
            newPrivilegeText = l[8874];
        }
        else if (message.meta.privilege === 0) {
            newPrivilegeText = l[8873];
        }

        var text = l[8915]
            .replace("%1", `<strong>${newPrivilegeText}</strong>`)
            .replace(
                "%2",
                `<strong>${megaChat.html(displayName)}</strong>`
            );

        messages.push(
            <div className="message body" data-id={"id" + message.messageId} key={message.messageId}>
                {avatar}
                <div className="message content-area small-info-txt">
                    <ContactsUI.ContactButton
                        className="message"
                        chatRoom={self.props.chatRoom}
                        contact={otherContact}
                        label={<Emoji>{otherDisplayName}</Emoji>}
                    />
                    {datetime}
                    <div className="message text-block">
                        <ParsedHTML>{text}</ParsedHTML>
                    </div>
                </div>
            </div>
        );


        return <div>{messages}</div>;
    }
};

export {
    PrivilegeChange
};
