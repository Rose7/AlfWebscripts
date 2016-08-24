<#if "${status.code}" != "200">
{
	"status":"${status.code}",
	"message":"${status.message}"
}
<#else>
{
	"status":"${status.code}",
	"message":"${message}",
	"nodeRef":"${node.nodeRef}"
}
</#if>