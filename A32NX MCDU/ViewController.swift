//
//  ViewController.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/7/21.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {

    @IBOutlet weak var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        //webView.navigationDelegate = self
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.delegate = self
        let url = Bundle.main.url(forResource: "screen", withExtension: "html", subdirectory: "screen")!
        webView.loadFileURL(url, allowingReadAccessTo: url)
        webView.load(URLRequest(url: url))
    }
    
    func sendEvent(eventName: String) {
        webView.evaluateJavaScript("document.socket.send('event:\(eventName)');")
    }

    
    
}

extension ViewController: UIScrollViewDelegate {
   func scrollViewWillBeginZooming(_ scrollView: UIScrollView, with view: UIView?) {
      scrollView.pinchGestureRecognizer?.isEnabled = false
   }
}
