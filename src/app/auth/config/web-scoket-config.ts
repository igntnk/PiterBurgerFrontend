import { RxStompConfig } from "@stomp/rx-stomp";

export const WebSocketConfig: RxStompConfig = {

  brokerURL: 'ws://192.168.100.27:8080/ws',

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,


  reconnectDelay: 200,
};
