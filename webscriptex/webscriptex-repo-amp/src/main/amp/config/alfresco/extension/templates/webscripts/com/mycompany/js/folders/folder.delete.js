function main()
{   
	/**
	 * Check for mandatory input parameters
 	 */  
	var fNodeRef = args["nodeRef"];
	if(fNodeRef === null || fNodeRef === "")
	{
		status.code = 404;
		status.message = "Folder nodeRef parameter is not passed in request parameters.";
		return;
	} 
	
	try
	{
		/**
		 * Check for Folder existence in repository
		 */	
		var folderNodeRef = search.findNode(fNodeRef);
		if(folderNodeRef === null)
		{
			status.code = 404;
			status.message = "Folder " + fNodeRef + " not found.";
			return;
		}
		
		/**
		 * Check for node Type is Folder or not 
		 */
		if(!folderNodeRef.isContainer)
		{
			status.code = 404;
			status.message = "Passed " + folderNodeRef.nodeRef + " is not of type Folder.";
			return;
		}
		
		/**
		 * Delete the Folder
		 */
		folderNodeRef.remove();
	
	}
	catch(e)
    {
		//status.setCode(status.STATUS_INTERNAL_SERVER_ERROR, e.toString());
		status.code = status.STATUS_INTERNAL_SERVER_ERROR;
		status.message = "Something went wrong in fulfilling the request. " + e.toString();
		return;
    }
	
	// Record the details in model object for response template	
	model.message = "Folder Deleted Successfully.";
	
}
main();