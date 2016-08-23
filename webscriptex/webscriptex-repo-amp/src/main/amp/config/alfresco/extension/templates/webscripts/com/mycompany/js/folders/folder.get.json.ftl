<#if "${status.code}" != "200">
	{
		"status"	: "${status.code}",
		"message" 	: "${status.message}"
	}
<#else>
	{
		"name":"${name}",
		"title":"${title!'No tile'}",
		"description":"${desc!'No desc'}"
	}
</#if>