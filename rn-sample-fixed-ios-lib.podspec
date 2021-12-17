Pod::Spec.new do |s|
    s.name         = "rn-sample-fixed-ios-lib"
    s.version      = "1.0.0"
    s.summary      = "Sample Module"
    s.description  = "Fooo"
    s.homepage     = "https://www.natura.com.br/"
    s.license      = "ISC"
    s.author       = { "Squad DS" => "" }
    s.source       = { :git => "git@github.com:natura-cosmeticos/natds-rn-samples.git", :branch => 'ios-integration', :tag => s.version.to_s }
    s.source_files = "sampleTS/ios/rn-sample-fixed-ios-lib/**/*.{swift,h,m}"
    s.ios.deployment_target  = '10.0'

    s.resources = [
      'sampleTS/ios/rn-sample-fixed-ios-lib/Resources/*'
    ]

    s.exclude_files = [
      'sampleTS/ios/sampleTS/',
      'sampleTS/ios/sampleTSTests/',
      'sampleTS/ios/rn-sample-fixed-ios-libTests/',
      'sampleTS/ios/rn-sample-fixed-ios-lib/Resources/Info.plist',
      'sampleTS/ios/rn-sample-fixed/',
    ]
  
    s.dependency 'React'
    s.dependency 'React-Core'
    s.dependency 'React-CoreModules'
    s.dependency 'React-Core/DevSupport'
    s.dependency 'React-RCTActionSheet'
    s.dependency 'React-RCTAnimation'
    s.dependency 'React-RCTBlob'
    s.dependency 'React-RCTImage'
    s.dependency 'React-RCTLinking'
    s.dependency 'React-RCTNetwork'
    s.dependency 'React-RCTSettings'
    s.dependency 'React-RCTText'
    s.dependency 'React-RCTVibration'
    s.dependency 'React-Core/RCTWebSocket'
  
  end
