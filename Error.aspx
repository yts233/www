<%@ Page Language="C#" %>

<script runat="server">
    string title, tip;
    private void Page_Load(object sender, EventArgs e)
    {
        switch (Request.QueryString["type"])
        {
            case "unknow": title = "未知的错误"; tip = "总之出现错误就对了"; return;
            case "400": title = "400 Bad Request"; tip = "请求的语法错误，服务器无法理解，我也没办法"; return;
            case "401": title = "401 Unauthorized"; tip = "你没有通过身份验证，要不登陆试试？"; return;
            case "403": title = "403 Forbidden"; tip = "你没有权限访问此页面，别挣扎了"; return;
            case "404": title = "404 Not Found"; tip = "指定文件不存在，检查一下URL？"; return;
            case "405": title = "405 Method Not Allowed"; tip = "你请求中的方法被禁止"; return;
            case "500": title = "500 Internal Server Error"; tip = "服务器内部错误，请告知管理员"; return;
            case "501": title = "501 Not Implemented"; tip = "服务器不支持请求的功能，无法完成请求"; return;
            case "503": title = "503 Service Unavailable"; tip = "由于超载或系统维护，服务器暂时无法处理你的请求"; return;
            default:
                if (Session["Error"] is Exception)
                { title = "错误"; tip = ((Exception)Session["Error"]).ToString(); Session.Remove("Error"); }
                else { title = "没有错误"; tip = "没有错误你来这干嘛啊"; }
                return;
        }
    }
</script>
<!DOCTYPE html>
<html>
<head>
    <title>
        <%= title %></title>
</head>
<body>
    <div>
        <h2>
            <%= title %></h2>
        <p>
            <%= tip.Replace("\n","<br>") %></p>
        <hr />
        Copyright ©
        <%= DateTime.Now.Year %>
        Ye_Tianshun. All rights reserved.
    </div>
</body>
</html>
