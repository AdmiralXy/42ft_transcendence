<template>
  <div class="direct-wrapper">
    <div class="friends-list">
      <div class="friends-list__search">
        <input type="text" class="friends-list__search-input" v-model="search" placeholder="Search">
      </div>
      <div class="friend-list__item" v-for="friend in filteredFriends">
        <div class="friend-list__item-avatar">
          <img :src="friend.avatar" alt="">
        </div>
        <div class="friend-list__item-name">
          <span>{{ friend.username }}</span>
        </div>
        <div class="friend-list__item-status">
          <span v-if="friend.status === 0" class="offline">Offline</span>
          <span v-else-if="friend.status === 1" class="online">Online</span>
          <span v-else class="ingame">In game</span>
        </div>
      </div>
    </div>
    <div class="direct-container">
      <div class="messages-list">
        <div class="messages-list-scrollable">
          <div class="message-item" :class="message.username === 'John Doe' ? 'message-item-to' : 'message-item-from'" v-for="message in messages">
            <div class="message-item__content">
              <div class="message-item__user">
                <div class="message-item__content-avatar">
                  <img :src="message.avatar" alt="">
                </div>
                <div class="message-item__content-username">
                  <span>{{ message.username }}</span>
                </div>
              </div>
              <div class="message-item__content-message">
                <span>{{ message.message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="messages-input">
        <textarea class="messages-input__textarea" v-model="message" placeholder="Type your message here"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "app",
  data() {
    return {
      search: "",
      messages: [
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "Hello, how are you?",
          created_at: "2020-01-01 00:00:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "Hi, I'm John Doe",
          created_at: "2020-01-01 00:01:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "And I'm fine",
          created_at: "2020-01-01 00:02:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "And you? How are you? Are you ok? I saw you online, so I decided to chat with you. Maybe you can help me with something?",
          created_at: "2020-01-01 00:03:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "Oh, easy!",
          created_at: "2020-01-01 00:04:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "Okay I need to play a game, and win some money",
          created_at: "2020-01-01 00:05:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "That's game not for money",
          created_at: "2020-01-01 00:06:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "I see u didn't know that",
          created_at: "2020-01-01 00:07:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "But ofc I can play with you",
          created_at: "2020-01-01 00:08:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "Okay let's play",
          created_at: "2020-01-01 00:09:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "I will start matchmaking soon",
          created_at: "2020-01-01 00:10:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "Alice Jackson",
          message: "Wait a minute",
          created_at: "2020-01-01 00:11:00"
        },
        {
          avatar: "https://i.pravatar.cc/25",
          username: "John Doe",
          message: "Okay, I'm here, let's start",
          created_at: "2020-01-01 00:12:00"
        }
      ],
      friends: [
        {
          id: 1,
          username: "John Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 0
        },
        {
          id: 2,
          username: "Jane Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 1
        },
        {
          id: 3,
          username: "Jack Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 0
        },
        {
          id: 4,
          username: "Jill Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 1
        },
        {
          id: 5,
          username: "Joe Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 2
        },
        {
          id: 6,
          username: "Jenny Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 1
        },
        {
          id: 7,
          username: "John Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 0
        },
        {
          id: 8,
          username: "Jane Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 1
        },
        {
          id: 9,
          username: "Jack Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 2
        },
        {
          id: 10,
          username: "Jill Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 0
        },
        {
          id: 11,
          username: "Joe Doe",
          avatar: "https://i.pravatar.cc/25",
          status: 1
        }
    ]
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter(friend => {
        return friend.username.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
})
</script>

<style lang="scss" scoped>
.direct-wrapper {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.friends-list {
  flex-basis: 240px;
  border-right: 1px solid rgba(113, 119, 144, 0.25);
  padding: 26px 26px 26px 0;
  overflow: auto;
  flex-shrink: 0;
}

.direct-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.friends-list__search {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}

.friends-list__search-input {
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: rgba(146, 151, 179, 0.13);
  color: #fff;
  font-size: 13.4px;
  transition: 0.3s ease;
}

.friends-list__search-input:focus-visible {
  outline: none;
  background-color: rgba(146, 151, 179, 0.35);
}

.friend-list__item {
  display: flex;
  align-items: center;
  padding: 10px 10px 15px 10px;
  border-bottom: 1px solid rgba(113, 119, 144, 0.25);
  cursor: pointer;
  transition: 0.3s ease;
}

.friend-list__item:hover {
  background-color: rgba(113, 119, 144, 0.3);
}

.friend-list__item-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
}

.friend-list__item-avatar img {
  width: 100%;
  height: 100%;
}

.friend-list__item-name {
  margin-left: 10px;
  font-size: 13.4px;
  color: #fff;
}

.friend-list__item-status {
  margin-left: auto;
  font-size: 13.4px;
  color: #fff;
}

.friend-list__item-status span {
  margin-right: 10px;
}

.friend-list__item-status span.ingame {
  color: #e3c520;
}

.friend-list__item-status span.online {
  color: #00d475;
}

.friend-list__item-status span.offline {
  color: #e05555;
}

.messages-list {
  flex-grow: 1;
  overflow: auto;
  padding: 26px 26px 26px 0;
}

.messages-list .messages-list-scrollable {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.message-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 10px 10px 10px;
  transition: 0.3s ease;
}

.message-item.message-item-from {
  justify-content: left;
}

.message-item.message-item-to {
  justify-content: right;
}

.message-item__content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.message-item__user {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.message-item.message-item-to .message-item__user {
  justify-content: flex-end;
}

.message-item.message-item-from .message-item__user {
  justify-content: flex-start;
}

.message-item__content-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
}

.message-item__content-username {
  margin-left: 10px;
  font-size: 13.4px;
  color: #fff;
}

.message-item__content-message {
  padding: 7px 15px 7px 15px;
  border-radius: 10px;
  margin-top: 9px;
  font-size: 13.4px;
  color: #fff;
}

.message-item.message-item-to .message-item__content-message {
  background: rgba(134, 168, 192, 0.6);
}

.message-item.message-item-from .message-item__content-message {
  background: rgba(175, 175, 175, 0.6);
}

.messages-input {
  display: flex;
  flex-direction: column;
  padding: 0 26px 26px 26px;
  justify-content: end;
}

.messages-input__textarea {
  margin-top: 15px;
  width: 100%;
  border: none;
  border-radius: 2px;
  padding: 10px;
  background-color: rgba(146, 151, 179, 0.13);
  color: #fff;
  font-size: 13.4px;
  transition: 0.3s ease;
  resize: none;
}

.messages-input__textarea:focus-visible {
  outline: none;
  background-color: rgba(146, 151, 179, 0.23);
}
</style>
