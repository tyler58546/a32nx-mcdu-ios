//
//  ConnectionViewController.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/9/21.
//

import UIKit

class ConnectionViewController: UIViewController {

    var mainVC:ViewController?

    @IBOutlet weak var ipField: UITextField!
    @IBOutlet weak var portField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        overrideUserInterfaceStyle = .light
        isModalInPresentation = true;
        let defaults = UserDefaults.standard
        ipField.text = defaults.string(forKey: "ip")
        let port = defaults.string(forKey: "port")
        if (port != nil) {
            portField.text = port
        }
    }

    func showFailureMessage(reason: String) {
        let alert = UIAlertController(title: "Connection Failed", message: reason, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    @IBAction func connectPressed(_ sender: Any) {
        let defaults = UserDefaults.standard
        defaults.set(ipField.text, forKey: "ip")
        defaults.set(portField.text, forKey: "port")
        mainVC!.connect(ip: ipField.text ?? "", port: portField.text ?? "8080")
    }
    
}
