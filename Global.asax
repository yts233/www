<%@ Application Language="C#" %>
<script RunAt="server">

    const bool disableError = false;

    void Application_Start(object sender, EventArgs e)
    {
        //在应用程序启动时运行的代码
        /*
        int retry = 0;
        while (retry < 10 && Database.Connection.State == System.Data.ConnectionState.Closed)
        {
            Database.Open();
            retry++;
        }
         */
    }

    void Application_End(object sender, EventArgs e)
    {
        //在应用程序关闭时运行的代码
        /*
        Database.Close();
         */
    }

    void Application_Error(object sender, EventArgs e)
    {
        //在出现未处理的错误时运行的代码
        if (!disableError)
            try
            {
                Session.Add("Error", Server.GetLastError());
                Server.ClearError();
                Response.Redirect("/Error.aspx");
            }
            catch { }
    }

    void Session_Start(object sender, EventArgs e)
    {
        //在新会话启动时运行的代码

    }

    void Session_End(object sender, EventArgs e)
    {
        //在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式 
        //设置为 StateServer 或 SQLServer，则不会引发该事件。

    }

    void Application_BeginRequest(Object sender, EventArgs e)
    {
        string url = HttpContext.Current.Request.RawUrl;
        string arg = "";
        if (url.IndexOf('?') != -1)
        {
            arg = url.Substring(url.IndexOf('?'));
            url = url.Substring(0, url.IndexOf('?'));
        }
        if (url.LastIndexOf('.') < url.LastIndexOf('/'))
            if (url.Last() != '/')
                this.Context.RewritePath(url + ".html" + arg);
        if (url.Last() == '/')
            this.Context.RewritePath(url + "index.html");
    }
       
</script>
