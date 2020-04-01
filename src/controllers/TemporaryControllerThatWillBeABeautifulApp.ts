import path from "path";
import express from "express";
import IController from "./IController";

export default class TemporaryControllerThatWillBeABeautifulApp implements IController
{
	private static readonly VIEWS_PATH:string = "webapp/";
	
	constructor(private app:express.Express)
	{
		
	}
	
	public initRoutes()
	{
		this.app.get("/", this.home);
		this.app.get("/:id", this.join);
	}
	
	protected home(req:express.Request, res:express.Response)
	{
		req;
		res.sendFile(path.resolve(TemporaryControllerThatWillBeABeautifulApp.VIEWS_PATH + "index.html"));
	}
	protected join(req:express.Request, res:express.Response)
	{
		req;
		res.sendFile(path.resolve(TemporaryControllerThatWillBeABeautifulApp.VIEWS_PATH + "join.html"));
	}
}