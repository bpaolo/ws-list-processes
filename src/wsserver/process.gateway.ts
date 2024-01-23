import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, Inject, Injectable } from '@nestjs/common';
import { StartSession } from '../usecases/StartSession';
import { BootstrapTable } from '../usecases/BootstrapTable';

@WebSocketGateway({ namespace: 'process' })
export class ProcessGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	private logger: Logger = new Logger('ProcessGateway');
	@WebSocketServer() wss: Server;

  constructor(
    @Inject('StartSession')
    private startSession: StartSession,

    @Inject('BootstrapTable')
    private bootstrapTable: BootstrapTable
  ){}

	async afterInit(server: any) {
		this.logger.log('Initialize ProcessGateway!');
    await this.bootstrapTable.boot(this.wss);
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
    this.startSession.start(client.id);
    client.join('general');
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}
