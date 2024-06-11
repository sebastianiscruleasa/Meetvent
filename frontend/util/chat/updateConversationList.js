const getUpdatedConversationList = (conversations, receivedMessage, myId) => {
    let updatedConversation;
    const updatedList = [];
    conversations.map((conversation) => {
        if(conversation.contact._id === receivedMessage.user._id) {
            updatedConversation = updateMessage(conversation, receivedMessage, myId);
        } else {
            updatedList.push(conversation);
        }
    })
    return [updatedConversation, ...updatedList];
}
export default getUpdatedConversationList;

const updateMessage = (conversation, receivedMessage, myId) => {
    if(conversation.contact._id === receivedMessage.user._id) {
        if(conversation.message) {
            conversation.message.receiverId = myId
            conversation.message.senderId = conversation.contact._id
            conversation.message.text = receivedMessage.text;
            conversation.message.createdAt = receivedMessage.createdAt;
            conversation.message.read = false;
        } else {
            conversation.message = {
                receiverId: myId,
                senderId: conversation.contact._id,
                text: receivedMessage.text,
                createdAt: receivedMessage.createdAt,
                read: false
            }
        }
    }
    return conversation;
}
