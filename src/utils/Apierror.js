class Apierror extends Error
{
   constructor(
    statusCode,
    message="Someting went Wrong",
    error=[]
   )
   {
    super(message),
    this.statusCode=statusCode,
    this.data=null,
    this.message=message,
    this.success=null,
    this.error=error
   }
}
export {Apierror}