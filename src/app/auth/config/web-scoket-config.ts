import { RxStompConfig } from "@stomp/rx-stomp";

export const WebSocketConfig: RxStompConfig = {

  brokerURL: 'ws://25.1.95.26:8080/ws',

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,


  reconnectDelay: 200,
};
