//
//  ViewController.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/7/21.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet weak var webView: WKWebView!

    var connectionVC: ConnectionViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        webView.configuration.userContentController.add(self, name: "callback")
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.delegate = self
        let url = Bundle.main.url(forResource: "screen", withExtension: "html", subdirectory: "screen")!
        webView.loadFileURL(url, allowingReadAccessTo: url)
        webView.load(URLRequest(url: url))
    }
    
    func sendEvent(eventName: String) {
        webView.evaluateJavaScript("document.socket.send('event:\(eventName)');")
    }



    func openConnectionViewController() {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        if (connectionVC == nil) {
            connectionVC = storyboard.instantiateViewController(withIdentifier: "ConnectionVC") as? ConnectionViewController
        }
        connectionVC!.mainVC = self
        if (connectionVC!.presentingViewController == nil) {
            present(connectionVC!, animated: true)
        }
    }

    func connect(ip:String, port:String) {
        webView.evaluateJavaScript("document.connect('\(ip)', '\(port)')");
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("event \(message.body)")
        guard let response = message.body as? String else { return }
        if (response == "connected" && connectionVC != nil) {
            connectionVC?.dismiss(animated: true)
        }
        if (response == "failed" && connectionVC != nil) {
            connectionVC?.showFailureMessage(reason: "Failed to connect to server.")
        }
        if (response == "disconnected") {
            openConnectionViewController()
        }
    }
    
}

extension ViewController: UIScrollViewDelegate {
   func scrollViewWillBeginZooming(_ scrollView: UIScrollView, with view: UIView?) {
      scrollView.pinchGestureRecognizer?.isEnabled = false
   }
}
