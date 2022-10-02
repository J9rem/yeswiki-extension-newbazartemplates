<?php

/*
 * This file is part of the YesWiki Extension newbazartemplates.
 *
 * Authors : see README.md file that was distributed with this source code.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace YesWiki\Newbazartemplates\lib;

use Composer\Config\JsonConfigSource;
use Composer\Factory;
use Composer\Script\Event;
use Composer\Installer\PackageEvent;
use Composer\Json\JsonFile;
use Throwable;

class ComposerHelper {

    public static function setVersionName(Event $event)
    {
        // $tag = self::getLatestTagScript();
        $version = empty($tag) ? self::getRevisionName() : $tag;

        $io = $event->getIO();
        $config = Factory::createConfig($io);
        $configFile = new JsonFile(Factory::getComposerFile(), null, $io);
        $configSource = new JsonConfigSource($configFile);
        $rawData = $configFile->read();
        $configSource->addProperty('version',$version);
        $composer = $event->getComposer();
        $composerConfig = $composer->getConfig();
        $composerConfig->setConfigSource($configSource);
        $composer->setConfig($composerConfig);

    }

    private static function getTimestamp(): string
    {
        return exec('git log --pretty="%cd" --date=short -1 .');
    }

    private static function getRevisionName(): string
    {
        $day = self::getTimestamp();
        exec('git log --pretty="%cd" --date=short --after="'.$day.' 00:00" --before="'.$day.' 23:59" .',$output);
        return $day.'-'.count($output);
    }

    private static function getLatestTagScript(): string
    {
        try {
            $results = exec('git rev-list --tags --max-count=1');
            return empty($results) ? "" : exec("git describe --tags $results");
        } catch (Throwable $ex){
            return "";
        }
    }
}