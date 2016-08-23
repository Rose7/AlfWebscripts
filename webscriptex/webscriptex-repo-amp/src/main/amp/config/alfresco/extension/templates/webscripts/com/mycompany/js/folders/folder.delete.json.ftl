<#if "${status.code}" != "200">
{
	"status":"${status.code}",
	"message":"${status.message}"
}
<#else>
{
	"message":"${message}"
}
</#if>