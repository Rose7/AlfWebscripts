function main()
{	
	/**
	 * Parse URL parameters
	 */
	//var parentFolderNodeRef = args["folderNodeRef"];
	//var folderName = args["folderName"];	
	
	/**
	 * Parse formdata attributes
     */
	var parentFolderNodeRef = null;
	var folderName = null;
	
	for each (field in formdata.fields)
    {
         switch (String(field.name))
         {
            case "folderNodeRef":
               	  parentFolderNodeRef = field.value.length() > 0 && field.value != "null" ? field.value : null;
               	  break;
            
            case "folderName":
            	 folderName = field.value.length() > 0 && field.value != "null" ? field.value : null;
            	 break;
         }
    }     
	
	/**
	 * Check for mandatory input parameters
 	 */
	if(parentFolderNodeRef === null || folderName === null )
	{
		status.code = 404;
		status.message = "folderNodeRef or folderName parameter is not passed in request parameters.";
		return;
	} 

	
	try
	{	
	
		/**
		 * Check for Folder existence in repository
		 */
		var destNodeRef = search.findNode(parentFolderNodeRef);
		if(destNodeRef === null)
		{
			status.code = 404;
			status.message = "Parent Folder " + parentFolderNodeRef + " not found.";
			return;
		}
		
		/**
		 * Create a new Folder
		 */
		var folderType = args["folderType"];
		if(folderType !== null)
		{
			newFolderNodeRef = destNodeRef.createFolder(folderName, folderType);	
		} 
		else
		{
			newFolderNodeRef = destNodeRef.createFolder(folderName);
		}
		
		/**
		 * (Optional) Add title & description properties of Titled Aspect
		 */
		var title = args["title"];
		var description = args["description"];
		if(title !== null || description !== null)
		{
			var props = new Array();
			props["cm:title"] = title
			props["cm:description"] = description
		
			newFolderNodeRef.addAspect("cm:titled",props);	
		}
	}
	catch(e)
    {
		//status.setCode(status.STATUS_INTERNAL_SERVER_ERROR, e.toString());
		status.code = status.STATUS_INTERNAL_SERVER_ERROR;
		status.message = "Something went wrong in fulfilling the request. " + e.toString();
		return;
    }
	
	// Record the details in model object for response template	
	model.message = "Folder Created Successfully.";
	model.node = newFolderNodeRef;
}

main();