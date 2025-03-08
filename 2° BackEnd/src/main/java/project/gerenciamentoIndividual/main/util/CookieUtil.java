package project.gerenciamentoIndividual.main.util;

import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtil {
	
	public static String getCookieValue(HttpServletRequest request, String name) {
		final Cookie cookieAccess = WebUtils.getCookie(request, name);
		return (cookieAccess != null) ? cookieAccess.getValue() : null;
	}
	
	public static void create(HttpServletResponse httpServletResponse, String name, String value, HttpServletRequest req){
        Cookie cookie = new Cookie(name, value);
        cookie.setSecure(req.isSecure());
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 365);
        cookie.setDomain(req.getServerName());
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);
    }
    public static void clear(HttpServletResponse httpServletResponse, String name, HttpServletRequest req){
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(1);
        cookie.setDomain(req.getServerName());
        httpServletResponse.addCookie(cookie);
    }
}